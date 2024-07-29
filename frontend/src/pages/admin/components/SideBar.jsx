import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { authLogout } from '../../../redux/userSlice';
import { useDispatch } from 'react-redux';
import WidgetsIcon from '@mui/icons-material/Widgets';
import {useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useSelector } from 'react-redux';

const SideBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(authLogout());
        navigate('/');
      };
    const location = useLocation();

    const { currentRole } = useSelector(state => state.user);

    return (
        <>
            <React.Fragment>
                <ListItemButton
                    component={Link} to="/"
                    sx={(location.pathname === "/" || location.pathname === "/Admin/dashboard") ? styles.currentStyle : styles.normalStyle}
                >
                    <ListItemIcon>
                        <WidgetsIcon sx={{ color: (location.pathname === "/" || location.pathname === "/Admin/dashboard") ? '#2e4053' : 'inherit' }} />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>

                <ListItemButton
                    component={Link} to="/Admin/products"
                    sx={location.pathname.startsWith('/Admin/products') ? styles.currentStyle : styles.normalStyle}
                >
                    <ListItemIcon>
                        <ShoppingCartIcon sx={{ color: location.pathname.startsWith('/Admin/products') ? '#2e4053' : 'inherit' }} />
                    </ListItemIcon>
                    <ListItemText primary="Products" />
                </ListItemButton>
                <ListItemButton
                    component={Link} to="/Admin/orders"
                    sx={location.pathname.startsWith('/Admin/orders') ? styles.currentStyle : styles.normalStyle}
                >
                    <ListItemIcon>
                        <PendingActionsIcon sx={{ color: location.pathname.startsWith("/Admin/orders") ? '#2e4053' : 'inherit' }} />
                    </ListItemIcon>
                    <ListItemText primary="Orders" />
                </ListItemButton>
                {
                    currentRole === " E-Commerce" &&
                    <ListItemButton
                        component={Link} to="/Admin/ E-Commerce"
                        sx={location.pathname.startsWith('/Admin/ E-Commerce') ? styles.currentStyle : styles.normalStyle}
                    >
                        <ListItemIcon>
                            <AdminPanelSettingsIcon sx={{ color: location.pathname.startsWith("/Admin/ E-Commerce") ? '#2e4053' : 'inherit' }} />
                        </ListItemIcon>
                        <ListItemText primary=" E-Commerce" />
                    </ListItemButton>
                }
            </React.Fragment>
            <Divider sx={{ my: 1 }} />
            <React.Fragment>
                <ListItemButton
                    component={Link} to="/Admin/profile"
                    sx={location.pathname.startsWith('/Admin/profile') ? styles.currentStyle : styles.normalStyle}
                >
                    <ListItemIcon>
                        <AccountCircleIcon sx={{ color: location.pathname.startsWith("/Admin/profile") ? '#2e4053' : 'inherit' }} />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItemButton>
            




            </React.Fragment>
        </>
    );
}

export default SideBar;

const styles = {
    normalStyle: {
        color: "inherit",
        backgroundColor: "inherit"
    },
    currentStyle: {
        color: "#2e4053",
        backgroundColor: "#ebebeb"
    },
}