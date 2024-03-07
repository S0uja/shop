import {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addItem, removeItem, deleteItem } from '../store/cart.store'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import AddIcon from '@mui/icons-material/Add'
import font from "../themes/font.theme"
import RemoveIcon from '@mui/icons-material/Remove'
import {getOneProduct} from '../http/Products.http'
import { setSnackbarModal } from '../store/modals.store'
import LoadingButton from '@mui/lab/LoadingButton';

const ProductButton = (props) => {
    const Cart = useSelector(state => state.cart.cart)
    const [loading,setLoading] = useState(false)
    
    const dispatch = useDispatch()

    const handleChange = (method) => {
      if(method==='add'){
        handleRemove({productId:props.id})
      }
      else{
        handleAdd({productId:props.id})
      }
    }

    const handleAdd = ({productId,count=1}) => {
      setLoading(true)
      getOneProduct(productId).then((res)=>{
        if(res.status!=='error') {
          dispatch(addItem({ productId:productId,count:count,product:res.data.data[0],price:res.data.data[0].price}))
        }
        else{
          dispatch(setSnackbarModal({
            modal:true,
            severity:'error',
            message:'Произошла ошибка, попробуйте позже'
          }))
        }
        setLoading(false)
      })
    }

    const handleRemove = ({productId}) => {
      setLoading(true)
      if(Cart.filter(item =>item.productId === props.id)[0].count<=1){
        setLoading(false)
        return dispatch(deleteItem({productId:productId}))
      }
      dispatch(removeItem({productId:productId}))
      setLoading(false)
    }

    return (
        <>
        {
            Boolean(Cart.filter(item => item.productId === props.id).length) ?
            <LoadingButton
              loading={loading}
              disableElevation
              variant={props.variant||"outlined"}
              color="success"
              size='small'
              style={{...props?.style}}
              sx={{...font,color:'',justifyContent:'space-between',px:3,fontWeight:750,width:1,borderRadius:2}}
              endIcon={<AddIcon size="small" onClick={()=>handleChange('remove')}/>}
              startIcon={<RemoveIcon size="small" onClick={()=>handleChange('add')}/>}
            >
              {Cart.filter(item => item.productId === props.id)[0].count}
            </LoadingButton>
            :
            <LoadingButton 
              loading={loading}
              disableElevation 
              variant={props.variant||"contained"}             
              color="success" 
              size='small' 
              style={{...props?.style}}
              sx={{...font,color:'',fontWeight:750,width:1,borderRadius:2}} 
              startIcon={<AddShoppingCartIcon size="small"/>}
              onClick={()=>{
                handleAdd({productId:props.id})
              }}
            >
              {props.price+" ₽"}
            </LoadingButton>
        }
        </>
    )
}

export default ProductButton