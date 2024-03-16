import {useState} from 'react'
import {Modal,Box,Backdrop,Collapse,ListItemAvatar,Avatar,Typography,IconButton} from '@mui/material'
import modal from '../themes/modal.theme'
import { useDispatch, useSelector } from 'react-redux'
import {setCartModal} from '../store/modals.store'
import ConvertToLitersAndKilograms from '../utils/СonvertToLitersAndKilograms.util'
import OrderButon from '../components/OrderButton.component'
import font from '../themes/font.theme'
import CloseIcon from '@mui/icons-material/Close';
import ProductButton from '../components/ProductButton.component'
import AutocompleteMap from '../components/AutocompleteMap.component'
import { createOrder } from '../http/Orders.http'
import { setCart } from '../store/cart.store'
import SyncCart from '../utils/SyncCart.util'
import { setAddresses } from '../store/user.store'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { setSnackbarModal } from '../store/modals.store'
import { setOrders } from '../store/user.store'
import hr from '../themes/hr.theme'
import CartPriceReduce from '../utils/CartPriceReduce.util'

const CartModal = () => {
  const dispatch = useDispatch()
  const CartModalStatus = useSelector(state => state.modals.cartModal)
  const Cart = useSelector(state => state.cart.cart)
  const Addresses = useSelector(state => state.user.addresses)
  const Orders = useSelector(state => state.user.orders)
  const [notAvailableProducts,setNotAvailableProducts] = useState(false)

  const CartAvailable = Cart.filter(item=>item.product.amount>0)
  const CartNotAvailable = Cart.filter(item=>item.product.amount<=0)

  const { totalLiters, totalKilograms } = ConvertToLitersAndKilograms(Cart)

  const [address,setAddress] = useState(null)
  const [addressError,setAddressError] = useState({status:false,message:null})

  const handleCloseCartModal = () => {
    dispatch(setCartModal(false))
  }
  const handleChangeAddress = (value) => {
    setAddress(value)
  }
  const handleCreateOrder = async () => {
    if(!Cart) return
    
    const syncCart = await SyncCart(Cart)
    dispatch(setCart(syncCart))

    if(!address){
      return setAddressError({status:true,message:'* Обязательное поле'})
    }

    if(!Addresses.filter(item => item.displayName === address).length){
      dispatch(setAddresses([...Addresses, {displayName:address}]))
      localStorage.setItem('addresses',JSON.stringify([...Addresses, {displayName:address}]))
    }

    setAddressError({status:false,message:null})

    await createOrder(address,syncCart.map(item=>{return {id:item.productId,count:item.count}}),CartPriceReduce(CartAvailable)).then(res=>{

      if(res?.status==='error' || !res){
          dispatch(setSnackbarModal({
              modal:true,
              severity:'error',
              message:res?.data?.message?.join('\n') || 'Ошибка'
          }))
          handleCloseCartModal()
      }
      else{
          dispatch(setSnackbarModal({
              modal:true,
              severity:'success',
              message:'Успешно'
          }))
          dispatch(setOrders([...Orders,res.data.data[0]]))
          dispatch(setCart(CartNotAvailable))
          handleCloseCartModal()
      }
    })
  }
  const handleOpenNotAvailableProducts = () => {
    setNotAvailableProducts(!notAvailableProducts)
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
        alignItems:'start',
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
        
          <Box
            sx={{
              height:'100%',
              width:'100%',
              minWidth:'280px',
              px:{es:0,xs:0,sm:2,md:2,lg:2,xl:2},
              flexGrow:1,
              display:'flex',
              flexDirection:'column',
              borderRadius:2,
              boxSizing:'border-box',
              scrollbarWidth:'thin',
              overflowY:'auto',
              overflowX:'hidden',
            }}
            component="nav"
          >
          
              {
                CartAvailable.length > 0 ?
                  CartAvailable.map((item,i)=>{
                    return (
                        <Box key={i} sx={{maxHeight:'50px',width:'100%',boxSizing:'border-box',flexGrow:1,display:'flex',gap:0.5,my:2,alignItems:'center'}}>
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
                              <Box sx={{...font,display:'flex',gap:2,justifyContent:'start',width:'100%'}}>
                                <Typography  component="div" variant="p" sx={{...font,color:'#787878', overflow: 'hidden', textOverflow: 'ellipsis', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical',lineHeight: '1.2em', height: '1.2em'}}>
                                  {item.product.weight_volume}
                                </Typography>
                                <Typography  component="div" variant="p" sx={{...font,color:'#787878', overflow: 'hidden', textOverflow: 'ellipsis', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical',lineHeight: '1.2em', height: '1.2em'}}>
                                  {item.product.price} ₽
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{width:'auto',pr:1}}>
                              <ProductButton id={item.product.id} variant={'text'} style={{color:'#404040',padding:0}}/>
                            </Box>
                        </Box>
                    )
                  })
                :
                <Box sx={{height:'auto',p:4,width:'100%',boxSizing:'border-box',flexGrow:1,justifyContent:'center',color:'#707070',display:'flex',alignItems:'center'}}>Пусто</Box>
              }
              {
                !!CartNotAvailable.length>0 && (
                  <Box sx={{width:'100%',display:'flex',alignItems:'center',gap:1}} onClick={handleOpenNotAvailableProducts}>
                    <Box sx={{flex:1,wordWrap:'nowrap',color:'#707070'}}>Недоступные к покупке</Box>
                    {
                      notAvailableProducts?
                      <ExpandMoreIcon sx={{color:'#707070'}}/>
                      :
                      <ExpandLessIcon sx={{color:'#707070'}}/>
                    }
                  </Box>
                )
              }
              {
                !!CartNotAvailable.length>0 && (
                  <Collapse in={notAvailableProducts} timeout="auto" unmountOnExit>
                    {
                      CartNotAvailable.map((item,i)=>{
                        return (
                            <Box key={i} sx={{width:'100%',boxSizing:'border-box',flexGrow:1,display:'flex',gap:0.5,my:2,alignItems:'center'}}>
                                <ListItemAvatar>
                                    <Avatar
                                        variant="rounded"
                                        src={import.meta.env.VITE_API_URL+(item.product.product_images[0]?.filename || 'defaultProductImage.jpg')}
                                        sx={{ filter:'greyscale(100%)',width: 50, height: 50 }}
                                    />
                                </ListItemAvatar>
                                <Box sx={{flexGrow:1}}>
                                  <Box sx={{...font,width:'100%'}}>
                                  <Typography variant="p" component="div" sx={{...font,width:'85%',wordBreak:'break-all', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',lineHeight: '1.2em', height: '2.4em',whiteSpace: 'wrap'}}>
                                      {item.product.name} 
                                    </Typography>  
                                  </Box>
                                  <Box sx={{...font,display:'flex',gap:2,justifyContent:'start',width:'100%'}}>
                                    <Typography  component="div" variant="p" sx={{...font,color:'#787878', overflow: 'hidden', textOverflow: 'ellipsis', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical',lineHeight: '1.2em', height: '1.2em'}}>
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
                  </Collapse>
                )
              }            
          </Box>
          
          <Box sx={{
            flexGrow:1,
            flex:1,
            width:'100%',
            maxWidth:'350px',
            height:{es:'40%',xs:'40%',sm:'40%',md:'100%',lg:'100%',xl:'100%'},
            p:2,
            boxSizing:'border-box',
            display:'flex',
            flexDirection:'column',
            justifyContent:'space-between',
            m:'0 auto'
            }}
          >

            <AutocompleteMap address={address} setAddress={handleChangeAddress} errors={addressError}/>
            
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
                {CartPriceReduce(CartAvailable)} ₽
              </Typography>

              <OrderButon disabled={!Cart.length} onClick={handleCreateOrder}/>

            </Box>
            
          </Box>
      </Box>
    </Modal>
  )
}

export default CartModal