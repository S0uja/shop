import {useState} from 'react'
import {Modal,Box,Backdrop,List,ListItemAvatar,Avatar,Typography,IconButton} from '@mui/material'
import modal from '../themes/modal.theme'
import { useDispatch, useSelector } from 'react-redux'
import {setCartModal} from '../store/modals.store'
import ConvertToLitersAndKilograms from '../utils/СonvertToLitersAndKilograms.util'
import OrderButon from '../components/OrderButton.component'
import font from '../themes/font.theme'
import hr from '../themes/hr.theme'
import CloseIcon from '@mui/icons-material/Close';
import { YMaps, Map } from '@pbe/react-yandex-maps';
import ProductButton from '../components/ProductButton.component'
import AutocompleteMap from '../components/AutocompleteMap.component'
const API_KEY = import.meta.env.VITE_YANDEX_API

const CartModal = () => {
  const dispatch = useDispatch()
  const CartModalStatus = useSelector(state => state.modals.cartModal)
  const Cart = useSelector(state => state.cart.cart)
  const { totalLiters, totalKilograms } = ConvertToLitersAndKilograms(Cart)
  const [searchValue, setSearchValue] = useState('');

  const handleCloseCartModal = () => {
    dispatch(setCartModal(false))
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={CartModalStatus}
      onClose={handleCloseCartModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
          backdrop: {
              timeout: 500,
          },
      }}
      sx={{boxSizing:'border-box'}}
    >
      <Box sx={{
        ...modal,
        display:'flex',
        justifyContent:'space-between',
        boxSizing:'border-box',
        flexDirection:{es:'column',xs:'column',sm:'column',md:'row',lg:'row',xl:'row'},
        gap:1
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleCloseCartModal}
          sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              zIndex:333,
              color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        {
          Cart.length===0
          ?
          <Box sx={{
              ...font,
              color:'rgb(120, 120, 120)',
              flex:1,
              fontSize:'18px',
              textAlign:'center',
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
              minHeight:'320px'
            }}
          >
            Пусто
          </Box>
          :
          <List
            sx={{
              width:'75%',
              height:'100%',
              minWidth:'280px',
              flex:1,
              px:{es:0,xs:0,sm:2,md:2,lg:2,xl:2},
              minHeight:'320px',
              flexGrow:1,
              display:'flex',
              flexDirection:'column',
              borderRadius:2,
              boxSizing:'border-box',
            }}
            component="nav"
          >
            <Box sx={{
              flex:1,
              height:'100%',
              overflowY:'auto',
              overflowX:'hidden',
              scrollbarWidth:'thin'
              }}
            >
            {
              Cart.map((item,i)=>{
                return (
                  <Box key={i} sx={{boxSizing:'border-box',flexGrow:1,display:'flex',gap:0.5,my:2,alignItems:'center'}}>
                      <ListItemAvatar>
                          <Avatar
                              variant="rounded"
                              src={import.meta.env.VITE_API_URL+(item.product.product_images[0]?.filename || 'defaultProductImage.jpg')}
                              sx={{ width: 50, height: 50 }}
                          />
                      </ListItemAvatar>
                      <Box sx={{flexGrow:1}}>
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
                      <Box sx={{width:'auto',pr:1}}>
                        <ProductButton id={item.product.id} variant={'text'} style={{color:'#404040',padding:0}}/>
                      </Box>
                  </Box>
                )
              })
            }
            </Box>
          </List>
        }
          <Box sx={{
            flexGrow:1,
            flex:1,
            width:'100%',
            maxWidth:'350px',
            p:2,
            boxSizing:'border-box',
            display:'flex',
            flexDirection:'column',
            justifyContent:'space-between'
            }}
          >

            <AutocompleteMap/>
            
            <Box>

              <Box sx={{display:'flex'}}>
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
              <Typography sx={{...font,color:'rgb(120, 120, 120)',fontSize:'22px',my:2}}>
                {Cart.reduce((accumulator, item) => accumulator + item.count*item.product.price,0)+" ₽"}
              </Typography>
              <OrderButon disabled={!Cart.length}/>

            </Box>
            
          </Box>
      </Box>
    </Modal>
  )
}

export default CartModal