const bcrypt = require('bcrypt');
const Admin = require('../models/AdminSchema.js');
const { createNewToken } = require('../utils/token.js');

const AdminRegister = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const newAdmin = new Admin({
            ...req.body,
            password: hashedPass
        });

        const existingAdminByEmail = await Admin.findOne({ email: req.body.email });
        const existingShop = await Admin.findOne({ shopName: req.body.shopName });

        if (existingAdminByEmail) {
            res.send({ message: 'Email already exists' });
        } else if (existingShop) {
            res.send({ message: 'Shop name already exists' });
        } else {
            let result = await newAdmin.save();
            result.password = undefined;

            const token = createNewToken(result._id);

            result = {
                ...result._doc,
                token: token
            };

            res.send(result);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const AdminLogIn = async (req, res) => {
    if (req.body.email && req.body.password) {
        let admin = await Admin.findOne({ email: req.body.email });
        if (admin) {
            const validated = await bcrypt.compare(req.body.password, admin.password);
            if (validated) {
                admin.password = undefined;

                const token = createNewToken(admin._id);

                admin = {
                    ...admin._doc,
                    token: token
                };

                res.send(admin);
            } else {
                res.send({ message: "Invalid password" });
            }
        } else {
            res.send({ message: "User not found" });
        }
    } else {
        res.send({ message: "Email and password are required" });
    }
};

module.exports = { AdminRegister, AdminLogIn };
