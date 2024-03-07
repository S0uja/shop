import React from 'react'
import {Box,Paper,Button,Typography,Avatar,Popover,List, ListItem , ListItemButton, ListItemIcon, ListItemText} from '@mui/material'
import font from '../themes/font.theme'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
const logo = new URL('../assets/logo.svg', import.meta.url).href
import { useSelector, useDispatch } from 'react-redux'
import { setAuthModal } from '../store/modals.store'
import StringAvatar from '../utils/StringAvatar.util'
import PersonIcon from '@mui/icons-material/Person'
import LogoutIcon from '@mui/icons-material/Logout'
import CreditScoreIcon from '@mui/icons-material/CreditScore'
import {clearUserInfo} from '../store/user.store'
import {clearCart} from '../store/cart.store'
import { setOrderModal,setProfileModal } from '../store/modals.store';

const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [isOpen, setIsOpen] = React.useState(false)
    const id = open ? 'simple-popover' : undefined
    const dispatch = useDispatch()
    const UserInfo = useSelector(state => state.user.userInfo)

    const handleOpenPopover = (event) => {
        setAnchorEl(event.currentTarget)
        setIsOpen(true)
    }

    const handleClosePopover = () => {
        setAnchorEl(null)
        setIsOpen(false)
    }

    const handleOpenAuthModal = () => {
        dispatch(setAuthModal(true))
    }

    const handleOut = () => {
        setIsOpen(false)
        dispatch(clearCart())
        dispatch(clearUserInfo())
    }

    const handleOpenOrder = () => {
        dispatch(setOrderModal(true))
    }

    const handleOpenProfile = () => {
        dispatch(setProfileModal(true))
    }

    return (
        <Paper id="header" elevation={0} sx={{my:'8px',alignItems:'center',justifyContent:'space-between',boxSizing:'border-box',p:2,display:'flex',width:'100%',borderRadius:2, height:60,backgroundColor:'#fff'}}>
            <Box sx={{display:'flex',alignItems:'center'}}>
                <img src={logo} style={{overflow:'hidden',height:'30px',borderRadius:1}} />
            </Box>
            
            {
                !UserInfo?.id
                ?
                <Button onClick={handleOpenAuthModal} disableElevation color="secondary" sx={{...font,borderRadius:2}} variant="text" startIcon={<PersonOutlineIcon/>}>Войти</Button>
                :
                <Box sx={{display:'flex',alignItems:'center'}}>
                    <Button aria-describedby={id} variant="text" onClick={handleOpenPopover} sx={{p:0,textTransform: 'none'}}>
                        <Typography sx={{...font,mx:2}}>{UserInfo.fio}</Typography>
                        <Avatar variant="rounded" {...StringAvatar(UserInfo.fio)} />
                    </Button>
                    <Popover
                        id={id}
                        open={isOpen}
                        anchorEl={anchorEl}
                        elevation={2}
                        onClose={handleClosePopover}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        sx={{mt:2}}
                    >
                        <List sx={{p:1}}>
                            <ListItem disablePadding>
                                <ListItemButton sx={{borderRadius:2}} onClick={handleOpenProfile}>
                                    <ListItemIcon>
                                        <PersonIcon sx={{...font,fontSize:'18px'}} />
                                    </ListItemIcon>
                                    <ListItemText primaryTypographyProps={{...font}} primary="Профиль" sx={font}/>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton sx={{borderRadius:2}} onClick={handleOpenOrder}>
                                    <ListItemIcon>
                                        <CreditScoreIcon sx={{...font,fontSize:'18px'}} />
                                    </ListItemIcon>
                                    <ListItemText primaryTypographyProps={{...font}} primary="Заказы" sx={font}/>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton sx={{borderRadius:2}} onClick={handleOut}>
                                    <ListItemIcon>
                                        <LogoutIcon sx={{...font,fontSize:'18px'}} />
                                    </ListItemIcon>
                                    <ListItemText primaryTypographyProps={{...font}} primary="Выйти" sx={font}/>
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Popover>
                </Box>
            }
            
        </Paper>
    )
}

export default Header