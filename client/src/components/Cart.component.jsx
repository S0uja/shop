import React from 'react'
import {List,ListSubheader,Box,ListItemAvatar,Avatar,ListItemText,Typography,Button} from '@mui/material'
import font from '../themes/font.theme'
import { useSelector, useDispatch } from 'react-redux'
import ProductButton from './ProductButton.component'
import hr from "../themes/hr.theme"
import ConvertToLitersAndKilograms from '../utils/СonvertToLitersAndKilograms.util'
import OrderButon from './OrderButton.component'
import AutocompleteMap from './AutocompleteMap.component'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import StartIcon from '@mui/icons-material/Start';

const Cart = () => {
  
  const Cart = useSelector(state => state.cart.cart)
  const { totalLiters, totalKilograms } = ConvertToLitersAndKilograms(Cart)
  const [value, setValue] = React.useState('1')

  const handleChange = (event, value) => {
    setValue(value);
  }

  return (
    <Box sx={{
      flexGrow:1,
      bgcolor:'background.paper',
      borderRadius:2,
      p:2,
      boxSizing:'border-box',
      position:'sticky',
      top: 8,
    }}>
      <TabContext value={value}>
        <Box sx={{display:'flex',justifyContent:'center'}}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Корзина" value="1" sx={{...font}}/>
            <Tab label="Данные заказа" value="2" sx={{...font}}/>
          </TabList>
        </Box>

        <TabPanel value="1" sx={{p:0}}>
          <List
            sx={{
              flexGrow:1,
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <Box sx={{boxSizing:'border-box',display:'flex',flexDirection:'column',minHeight:'250px',maxHeight:'436px',overflowY:'auto',scrollbarWidth:'none'}}>
              {
                Cart.length>0
                ?
                  Cart.map((item,i)=>{
                    return (
                      <Box key={i} sx={{boxSizing:'border-box',width:'100%',display:'flex',gap:0.5,my:1,alignItems:'center'}}>

                          <ListItemAvatar>
                              <Avatar
                                  variant="rounded"
                                  src={import.meta.env.VITE_API_URL+(item.product.product_images[0]?.filename || 'defaultProductImage.jpg')}
                                  sx={{ width: 50, height: 50 }}
                              
                              />
                          </ListItemAvatar>

                          <Box sx={{minWidth:'50%',flexGrow:1,position:'relative',boxSizing:'border-box'}}>
                            <Box sx={{...font,width:'100%'}}>
                            <Typography variant="p" component="div" sx={{...font,width:'85%',wordBreak:'break-all', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',lineHeight: '1.2em', height: '2.4em',whiteSpace: 'wrap'}}>
                                {item.product.name} 
                              </Typography>  
                            </Box>
                            <Box sx={{...font,width:'100%'}}>
                              <Typography  component="div" variant="p" sx={{...font,color:'#787878', width:'100%', overflow: 'hidden', textOverflow: 'ellipsis', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical',lineHeight: '1.2em', height: '1.2em'}}>
                                {item.product.weight_volume}
                              </Typography>
                            </Box>
                          </Box>

                          <Box sx={{width:'auto'}}>
                            <ProductButton id={item.product.id} variant={'text'} style={{color:'#404040',padding:0}}/>
                          </Box>
                      </Box>
                    )
                  })
                :
                  <Box sx={{...font,color:'rgb(120, 120, 120)',flex:1,fontSize:'18px',textAlign:'center',display:'flex',alignItems:'center',justifyContent:'center'}}>Пусто</Box>
              }
            </Box>
          </List> 

          <Button
            disabled={!Cart.length>0}
            disableElevation
            variant={"contained"}
            color="success"
            onClick={(e)=>handleChange(e,'2')}
            size='large'
            sx={{...font,color:'#fff',px:3,fontWeight:750,mt:1,width:1,borderRadius:2}}
            startIcon={<StartIcon size="small"/>}
          >   
            Продолжить
          </Button> 
      
        </TabPanel>

        <TabPanel value="2" sx={{p:0}}>
          <AutocompleteMap/>

          <Box sx={{display:'flex',width:'100%'}}>
            <Typography sx={{...font,flexGrow:1,color:'rgb(120, 120, 120)',fontSize:'14px'}}>
              Вес/Объем :
            </Typography>
            <Typography sx={{...font,flexGrow:1,color:'rgb(120, 120, 120)',fontSize:'14px'}}>
              {totalKilograms+" КГ"}
            </Typography>
            <Typography sx={{...font,flexGrow:1,color:'rgb(120, 120, 120)',fontSize:'14px'}}>
              {totalLiters+' Л'}
            </Typography>
          </Box>

          <Typography sx={{...font,color:'rgb(120, 120, 120)',fontSize:'20px',my:2}}>
            Стоимость: {Cart.reduce((accumulator, item) => accumulator + item.count*item.product.price,0)+" ₽"}
          </Typography>

          <OrderButon disabled={!Cart.length}/>
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default Cart