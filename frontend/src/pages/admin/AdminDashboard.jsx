import { useState } from 'react';
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
} from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import CloseIcon from '@mui/icons-material/Close';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { AppBar, Drawer, NavLogo } from '../../utils/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Logout from '../Logout';
import SideBar from './components/SideBar';
import AdminHomePage from './pages/AdminHomePage';
import AccountMenu from './components/AccountMenu';
import ShowProducts from './pages/ShowProducts';
import ShowOrders from './pages/ShowOrders';
import ViewProductAdmin from './pages/ViewProductAdmin';
import AddProduct from './pages/AddProduct';
import { useSelector } from 'react-redux';
import Products from '../../components/Products';
import { productDataList } from '../../utils/products';
import ECommerceSpecial from './pages/ECommerceSpecial';
import ShowCustomers from './pages/ShowCustomers';
import AdminProfile from './pages/AdminProfile';

const AdminDashboard = () => {
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => setOpen(!open);
    const { currentRole } = useSelector(state => state.user);
    const navigate = useNavigate();

    const homeHandler = () => navigate("/");

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar open={open} position="absolute" sx={{ backgroundColor: "#2e4053" }}>
                <Toolbar sx={{ pr: '24px' }}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{ marginRight: '36px', ...(open && { display: 'none' }) }}
                    >
                        <ListIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{
                            mr: 2,
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            cursor: "pointer"
                        }}
                        onClick={homeHandler}
                    >
                        <NavLogo>
                           <ShoppingCartIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, mt: '5px' }} />

                           E-Commerce
                        </NavLogo>
                    </Typography>
                    <Typography
                        variant="h5"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                        onClick={homeHandler}
                    >
                        <NavLogo>
                        <ShoppingCartIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, mt: '5px' }} />

                            E-Commerce
                        </NavLogo>
                    </Typography>
                    <AccountMenu />
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open} sx={open ? styles.drawerStyled : styles.hideDrawer}>
                <Toolbar sx={styles.toolBarStyled}>
                    <IconButton onClick={toggleDrawer}>
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List component="nav">
                    <SideBar />
                </List>
            </Drawer>
            <Box component="main" sx={styles.boxStyled}>
                <Toolbar />
                <Routes>
                    <Route path="/" element={<AdminHomePage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                    <Route path="/Admin/dashboard" element={<AdminHomePage />} />
                    <Route path="/Admin/profile" element={<AdminProfile />} />
                    <Route path="/Admin/addproduct" element={<AddProduct />} />
                    <Route path="/Admin/products" element={<ShowProducts />} />
                    <Route path="/Admin/products/product/:id" element={<ViewProductAdmin />} />
                    {currentRole === "ECommerce" && (
                        <>
                            <Route path="/Admin/ecommerce" element={<ECommerceSpecial />} />
                            <Route path="/Admin/uploadproducts" element={<Products productData={productDataList} />} />
                        </>
                    )}
                    <Route path="/Admin/orders" element={<ShowOrders />} />
                    <Route path="/Admin/orders/customers/:id" element={<ShowCustomers />} />
                    <Route path="/Admin/orders/product/:id" element={<ViewProductAdmin />} />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </Box>
        </Box>
    );
};

export default AdminDashboard;

const styles = {
    boxStyled: {
        backgroundColor: (theme) =>
            theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    toolBarStyled: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [1],
    },
    drawerStyled: {
        display: "flex"
    },
    hideDrawer: {
        display: 'flex',
        '@media (max-width: 600px)': {
            display: 'none',
        },
    },
};
