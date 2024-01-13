import { createSlice } from '@reduxjs/toolkit'

export const Cart = createSlice({
    name: 'cart',
    initialState: {
        value: [1,2,3,5],
    },
    reducers: {
        addProduct: (state,action) => {
            state.value.push(action.product)
        },
        removeProduct: (state) => {
            state.value = []
        },
        changeCount: (state, action) => {
            state.value += action.count
        },
    },
})
export const { addProduct, removeProduct} = Cart.actions
export default Cart.reducer
