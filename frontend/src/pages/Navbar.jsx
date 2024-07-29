import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Container, Button, Tooltip, Menu, MenuItem, Badge, Avatar, Divider, Drawer, ListItemIcon } from '@mui/material';
import { Search as SearchIcon, ShoppingCart as ShoppingCartIcon, Login, Logout, Shop2, Store } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';
import { authLogout } from '../redux/userSlice';
import Cart from './customer/components/Cart';
import Search from './customer/components/Search';
import ProductsMenu from './customer/components/ProductsMenu';
import { updateCustomer } from '../redux/userHandle';
import { NavLogo } from '../utils/styles';

const Navbar = () => {
    const { currentUser, currentRole } = useSelector(state => state.user);
    const totalQuantity = currentUser?.cartDetails?.reduce((total, item) => total + item.quantity, 0) || 0;
    const navigate = useNavigate();
    const dispatch = useDispatch();
 
  
    const handleLogout = () => {
      dispatch(authLogout());
      navigate('/');
    };
  
  
 
    React.useEffect(() => {
        if (currentRole === "Customer") {
            dispatch(updateCustomer(currentUser, currentUser._id));
        }
    }, [currentRole, currentUser, dispatch]);

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElSign, setAnchorElSign] = React.useState(null);
    const [isCartOpen, setIsCartOpen] = React.useState(false);

    const handleOpenCart = () => setIsCartOpen(true);
    const handleCloseCart = () => setIsCartOpen(false);
    const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
    const handleCloseNavMenu = () => setAnchorElNav(null);
    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
    const handleCloseUserMenu = () => setAnchorElUser(null);
    const handleOpenSigninMenu = (event) => setAnchorElSign(event.currentTarget);
    const handleCloseSigninMenu = () => setAnchorElSign(null);

    const homeHandler = () => navigate("/");

    return (
        <AppBar position="sticky" sx={{ backgroundColor: "#421e42"  }}>
            <Container maxWidth="xl" sx={{ backgroundColor: "#2e4053" }}>
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton size="large" aria-label="search" color="inherit" onClick={() => navigate("/Search")}>
                            <SearchIcon />
                        </IconButton>
                    </Box>

                    <HomeContainer>
                        <Typography variant="h5" noWrap sx={{ mr: 2, display: { xs: 'flex', md: 'none' }, flexGrow: 1, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none' }}>
                            <NavLogo to="top" activeClass="active" spy={true} smooth={true} offset={-70} duration={500} onClick={homeHandler}> E-Commerce</NavLogo>
                        </Typography>
                    </HomeContainer>

                    {currentRole === null && (
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" color="inherit" onClick={handleOpenNavMenu}>
                                <Login />
                            </IconButton>
                            <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left' }} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} sx={{ display: { xs: 'block', md: 'none' } }}>
                                <MenuItem onClick={() => { navigate("/Customerlogin"); handleCloseNavMenu(); }}>
                                    <Typography textAlign="center">Customer</Typography>
                                </MenuItem>
                                <MenuItem onClick={() => { navigate("/Adminlogin"); handleCloseNavMenu(); }}>
                                    <Typography textAlign="center">Admin Portal</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    )}

                    <HomeContainer>
                        <Typography variant="h6" noWrap sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none' }}>
                            <NavLogo to="top" activeClass="active" spy={true} smooth={true} offset={-70} duration={500} onClick={homeHandler}>
                        <ShoppingCartIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, mt: '5px' }} />

                                E-Commerce
                            </NavLogo>
                        </Typography>
                    </HomeContainer>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Search />
                        <ProductsMenu dropName="Categories" />
                        <ProductsMenu dropName="Products" />
                    </Box>

                    {currentRole === null && (
                        <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                            <Button onClick={handleOpenSigninMenu} sx={{ my: 2, color: 'white',width:'300px', display: 'block' }}>Sign-In</Button>
                            <Menu anchorEl={anchorElSign} id="menu-appbar" open={Boolean(anchorElSign)} onClose={handleCloseSigninMenu} PaperProps={{ elevation: 0, sx: styles.styledPaper }} transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                                <MenuItem onClick={() => navigate("/Customerlogin")}>
                                    <Avatar />
                                    <Link to="/Customerlogin">Customer</Link>
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={() => navigate("/Adminlogin")}>
                                    <ListItemIcon>
                                        <Store fontSize="small" />
                                    </ListItemIcon>
                                    <Link to="/Adminlogin">Admin Portal</Link>
                                </MenuItem>
                            </Menu>
                        </Box>
                    )}

                    {currentRole === "Customer" && (
                        <Box sx={{ flexGrow: 0, display: 'flex' }}>
                            <Tooltip title="Cart">
                                <IconButton onClick={handleOpenCart} sx={{ width: "4rem", color: 'inherit', p: 0 }}>
                                    <Badge badgeContent={totalQuantity} color="error">
                                        <ShoppingCartIcon sx={{ fontSize: "2rem" }} />
                                    </Badge>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Account settings">
                                <IconButton onClick={handleOpenUserMenu} size="small" sx={{ ml: 2 }} aria-controls={anchorElUser ? 'account-menu' : undefined} aria-haspopup="true" aria-expanded={anchorElUser ? 'true' : undefined}>
                                    <Avatar sx={{ width: 32, height: 32, backgroundColor: "#8970dc" }}>{currentUser?.name?.charAt(0)}</Avatar>
                                </IconButton>
                            </Tooltip>
                            <Menu anchorEl={anchorElUser} id="menu-appbar" open={Boolean(anchorElUser)} onClose={handleCloseUserMenu} PaperProps={{ elevation: 0, sx: styles.styledPaper }} transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                                <MenuItem onClick={() => navigate("/Profile")}>
                                    <Avatar />
                                    <Link to="/Profile">Profile</Link>
                                </MenuItem>
                                <MenuItem onClick={() => navigate("/Orders")}>
                                    <ListItemIcon>
                                        <Shop2 fontSize="small" />
                                    </ListItemIcon>
                                    <Link to="/Orders">My Orders</Link>
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={handleLogout}>
                        
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    <Link to="/Logout">Logout</Link>
                                </MenuItem>
                            </Menu>
                        </Box>
                    )}
                </Toolbar>
            </Container>
            {isCartOpen && (
                <Drawer anchor="right" open={isCartOpen} onClose={handleCloseCart} sx={{ width: '400px', flexShrink: 0, '& .MuiDrawer-paper': { width: '400px', boxSizing: 'border-box' } }}>
                    <Cart setIsCartOpen={setIsCartOpen} />
                </Drawer>
            )}
        </AppBar>
    );
};

export default Navbar;

const HomeContainer = styled.div`
  display: flex;
  cursor: pointer;
`;

const styles = {
    styledPaper: {
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 1.5,
        '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
        },
        '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
        },
    },
};
