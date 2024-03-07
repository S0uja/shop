import React from 'react'
import {Fab} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import font from '../themes/font.theme'
import {setCartModal} from '../store/modals.store'
import { useSelector, useDispatch } from 'react-redux'

const FabComponent = () => {
    const dispatch = useDispatch()
    const Cart = useSelector(state => state.cart.cart)
    const SumPrice = Cart.reduce((accumulator, item) => accumulator + item.price, 0)

    const handleClickFab = () => {
        dispatch(setCartModal(true))
    }

    return (
        <Fab variant="extended" size="large" color="primary" sx={{
            ...font,
            color:'#fff',
            alignItems:'center',
            position:'fixed',
            bottom:'10px',
            right:'10px',
            display:{es:'flex',xs:'flex',sm:'flex',md:'flex',lg:'flex',xl:'none'}
            
        }} onClick={handleClickFab}>
            <ShoppingCartIcon sx={{ mr: 1 }} />
            {SumPrice+" ₽"}
        </Fab>
    )
}

export default FabComponent