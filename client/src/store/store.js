import { configureStore } from '@reduxjs/toolkit'
import Cart from './cart/cart.state.js'
export default configureStore({
    reducer: {
        cart:Cart
    },
})
