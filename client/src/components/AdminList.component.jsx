import {useState} from 'react'
import InventoryIcon from '@mui/icons-material/Inventory'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import font from '../themes/font.theme'
import {List,ListItemButton,Avatar,ListItemAvatar,ListItemText,Divider,Badge} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CollectionsIcon from '@mui/icons-material/Collections';
import EmailIcon from '@mui/icons-material/Email';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const AdminListComponent = () => {
    const [activeTab,setActiveTab] = useState(1)

    return (
        <List
            id="tables"
            sx={{
                flexGrow:1,
                bgcolor:'background.paper',
                borderRadius:2,
                p:{es:0,xs:0,sm:0,md:2,lg:2,xl:2},
                gap:1,
                display:'flex',
                flexDirection:{es:'row',xs:'row',sm:'row',md:'column',lg:'column',xl:'column'},
                boxSizing:'border-box',
                overflowX:'auto',
                scrollbarWidth:'none'
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >

            <ListItemButton sx={{borderRadius:2,minWidth:'170px'}}>
                <ListItemAvatar sx={{ minWidth: 40 }}>
                    <Avatar 
                        variant="rounded"
                        sx={{ width: 24, height: 24, bgcolor:'#404040' }}
                        
                    >
                        <DashboardIcon sx={{width:'16px'}} />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primaryTypographyProps={font} primary={'Информационная панель'}/>
            </ListItemButton>

            <Divider textAlign="left" sx={{...font,color:'#878787',display:{es:'none',xs:'none',sm:'none',md:'flex',lg:'flex',xl:'flex'}}}>Инструменты</Divider>

            <ListItemButton sx={{borderRadius:2,minWidth:'170px'}}>
                <ListItemAvatar sx={{ minWidth: 40 }}>
                    <Avatar 
                        variant="rounded"
                        sx={{ width: 24, height: 24, bgcolor:'#404040' }}
                        
                    >
                        <DescriptionIcon sx={{width:'16px'}} />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primaryTypographyProps={font} primary={'Отчетность'}/>
            </ListItemButton>

            <ListItemButton sx={{borderRadius:2,minWidth:'170px'}}>
                <ListItemAvatar sx={{ minWidth: 40 }}>
                    <Badge badgeContent={4} color="info" max={99}>
                        <Avatar 
                            variant="rounded"
                            sx={{ width: 24, height: 24, bgcolor:'#404040' }}
                            
                        >
                            <EmailIcon sx={{width:'16px'}} />
                        </Avatar>
                    </Badge>
                </ListItemAvatar>
                <ListItemText primaryTypographyProps={font} primary={'Почта'}/>
            </ListItemButton>

            <ListItemButton sx={{borderRadius:2,minWidth:'170px'}}>
                <ListItemAvatar sx={{ minWidth: 40 }}>
                    <Badge badgeContent={4} color="info" max={99}>
                        <Avatar 
                            variant="rounded"
                            sx={{ width: 24, height: 24, bgcolor:'#404040' }}
                            
                        >
                            <SupportAgentIcon sx={{width:'16px'}} />
                        </Avatar>
                    </Badge>
                </ListItemAvatar>
                <ListItemText primaryTypographyProps={font} primary={'Поддержка'}/>
            </ListItemButton>

            <Divider textAlign="left" sx={{...font,color:'#878787',display:{es:'none',xs:'none',sm:'none',md:'flex',lg:'flex',xl:'flex'}}}>База данных</Divider>

            <ListItemButton sx={{borderRadius:2,minWidth:'170px'}}>
                <ListItemAvatar sx={{ minWidth: 40 }}>
                    <Avatar 
                        variant="rounded"
                        sx={{ width: 24, height: 24, bgcolor:'#404040' }}
                        
                    >
                        <ManageAccountsIcon sx={{width:'16px'}} />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primaryTypographyProps={font} primary={'Персонал'}/>
            </ListItemButton>

            <ListItemButton sx={{borderRadius:2,minWidth:'170px'}}>
                <ListItemAvatar sx={{ minWidth: 40 }}>
                    <Avatar 
                        variant="rounded"
                        sx={{ width: 24, height: 24, bgcolor:'#404040' }}
                        
                    >
                        <InventoryIcon sx={{width:'16px'}} />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primaryTypographyProps={font} primary={'Товары'}/>
            </ListItemButton>

            <ListItemButton sx={{borderRadius:2,minWidth:'170px'}}>
                <ListItemAvatar sx={{ minWidth: 40 }}>
                    <Avatar 
                        variant="rounded"
                        sx={{ width: 24, height: 24, bgcolor:'#404040' }}
                        
                    >
                        <PeopleAltIcon sx={{width:'16px'}} />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primaryTypographyProps={font} primary={'Пользователи'}/>
            </ListItemButton>

            <ListItemButton sx={{borderRadius:2,minWidth:'170px'}}>
                <ListItemAvatar sx={{ minWidth: 40 }}>
                    <Avatar 
                        variant="rounded"
                        sx={{ width: 24, height: 24, bgcolor:'#404040' }}
                        
                    >
                        <AccountCircleIcon sx={{width:'16px'}} />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primaryTypographyProps={font} primary={'Производители'}/>
            </ListItemButton>

            <ListItemButton sx={{borderRadius:2,minWidth:'170px'}}>
                <ListItemAvatar sx={{ minWidth: 40 }}>
                    <Avatar 
                        variant="rounded"
                        sx={{ width: 24, height: 24, bgcolor:'#404040' }}
                        
                    >
                        <CategoryIcon sx={{width:'16px'}} />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primaryTypographyProps={font} primary={'Категории'}/>
            </ListItemButton>

            <ListItemButton sx={{borderRadius:2,minWidth:'170px'}}>
                <ListItemAvatar sx={{ minWidth: 40 }}>
                    <Avatar 
                        variant="rounded"
                        sx={{ width: 24, height: 24, bgcolor:'#404040' }}
                        
                    >
                        <ShoppingCartIcon sx={{width:'16px'}} />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primaryTypographyProps={font} primary={'Заказы'}/>
            </ListItemButton>

            <ListItemButton sx={{borderRadius:2,minWidth:'170px'}}>
                <ListItemAvatar sx={{ minWidth: 40 }}>
                    <Avatar 
                        variant="rounded"
                        sx={{ width: 24, height: 24, bgcolor:'#404040' }}
                        
                    >
                        <CollectionsIcon sx={{width:'16px'}} />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primaryTypographyProps={font} primary={'Коллекции'}/>
            </ListItemButton>
 
        </List>
    )
}

export default AdminListComponent