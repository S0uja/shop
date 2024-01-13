import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from 'react-redux'
import Button from "@mui/material/Button";
import { addProduct, removeProduct } from '../store/cart/cart.state.js'

const styleModal = {
    position: 'absolute',
    top: '8%',
    left: '50%',
    transform: 'translate(-50%, 0)',
    maxWidth:'600px',
    width: '80%',
    border:'1px solid #7f7f7f',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius:1,
    p: 4
};
export default function Header() {
    const [openProfileMenu, setOpenProfileMenu] = React.useState(false)
    const [openMenu, setOpenMenu] = React.useState(false)
    const [openCart, setOpenCart] = React.useState(false)
    const [openOrders, setOpenOrders] = React.useState(false)

    const cartCount = useSelector((state) => state.cart.value.length)
    const dispatch = useDispatch()
    const handleCartOpen = () => setOpenCart(true)
    const handleCartClose = () => setOpenCart(false)
    const handleOrdersOpen = () => setOpenOrders(true)
    const handleOrdersClose = () => setOpenOrders(false)
    const handleMenuOpen = () => setOpenMenu(true)
    const handleMenuClose = () => setOpenMenu(false)
    const handleProfileMenuOpen = () => setOpenProfileMenu(true)
    const handleProfileMenuClose = () => setOpenProfileMenu(false)

    const renderProfileMenu = (
        <Menu anchorOrigin={{vertical: 'top', horizontal: 'right',}} id='primary-profile-menu' keepMounted transformOrigin={{vertical: 'top', horizontal: 'right',}} open={openProfileMenu} onClose={handleProfileMenuClose}>
            <MenuItem onClick={handleProfileMenuClose}>Профиль</MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>Выйти</MenuItem>
        </Menu>
    )
    const renderMenu = (
        <Menu anchorOrigin={{vertical: 'top', horizontal: 'left',}} id='primary-menu' keepMounted transformOrigin={{vertical: 'top', horizontal: 'left',}} open={openMenu} onClose={handleMenuClose}>
            <MenuItem onClick={handleProfileMenuClose}>Каталог</MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>Доставка</MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>О нас</MenuItem>
        </Menu>
    )
    const cartModal = (
        <Modal open={openCart} onClose={handleCartClose}>
            <Box sx={styleModal}>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                    Корзина
                </Typography>
                <Button aria-label="Increment value" onClick={() => dispatch(addProduct())}>
                    +
                </Button>

                <Typography>{cartCount}</Typography>

                <Button aria-label="Decrement value" onClick={() => dispatch(removeProduct())}>
                    -
                </Button>
            </Box>
        </Modal>
    )
    const ordersModal = (
        <Modal open={openOrders} onClose={handleOrdersClose}>
            <Box sx={styleModal}>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                    Заказы
                </Typography>
                <Button aria-label="Increment value" onClick={() => dispatch(addProduct())}>
                    +
                </Button>

                <Typography>{cartCount}</Typography>

                <Button aria-label="Decrement value" onClick={() => dispatch(removeProduct())}>
                    -
                </Button>
            </Box>
        </Modal>
    )


    return (
        <>
            <Box>
                <AppBar position="fixed">
                    <Toolbar>

                        <IconButton size="large" edge="end" sx={{mr:1, display: { xs:'flex',md:'none'}}} onClick={handleMenuOpen} aria-controls='primary-menu' aria-haspopup="true">
                            <MenuIcon />
                        </IconButton>

                        <Typography variant="h5" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
                            Food Express
                        </Typography>

                        <Box sx={{display:'flex',justifyContent:'center',gap:1,flexGrow:1}}>
                            <Button sx={{color: 'white', display:{xs:"none",md:"flex"} }}>
                                Каталог
                            </Button>
                            <Button sx={{color: 'white', display:{xs:"none",md:"flex"} }}>
                                Доставка
                            </Button>
                            <Button sx={{color: 'white', display:{xs:"none",md:"flex"} }}>
                                О нас
                            </Button>
                        </Box>

                        <Box sx={{display:'flex',gap:3}}>
                            <IconButton size="large" color="inherit" onClick={handleCartOpen}>
                                <Badge badgeContent={cartCount} color="error">
                                    <ShoppingBasketIcon />
                                </Badge>
                            </IconButton>
                            <IconButton size="large" color="inherit" onClick={handleOrdersOpen}>
                                <Badge badgeContent={17} color="error">
                                    <LocalShippingIcon />
                                </Badge>
                            </IconButton>
                            <IconButton size="small" edge="end" aria-controls='primary-profile-menu' aria-haspopup="true" onClick={handleProfileMenuOpen} color="inherit">
                                <Avatar>H</Avatar>
                            </IconButton>
                        </Box>

                    </Toolbar>
                </AppBar>

                {renderMenu}
                {renderProfileMenu}
                {cartModal}
                {ordersModal}

            </Box>
        </>
    );
}
