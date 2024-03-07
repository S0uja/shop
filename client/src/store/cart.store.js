import { createSlice } from '@reduxjs/toolkit'

export const cart = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
  },
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload
      localStorage.setItem('cart',JSON.stringify(state.cart))
    },
    clearCart: (state, action) => {
      state.cart = []
      localStorage.setItem('cart',JSON.stringify(state.cart))
    },
    addItem: (state, action) => {
      if(!state.cart.filter(item => item.productId === action.payload.productId).length){
        state.cart.push(action.payload)
      }
      else{
        state.cart.forEach(item => {
          if(item.productId === action.payload.productId){
            item.count++
            item.price+=action.payload.price
          }
        })
      }
      
      localStorage.setItem('cart',JSON.stringify(state.cart))
    },
    removeItem: (state,action) => {
      state.cart.forEach(item => {
        if(item.productId === action.payload.productId) {
          if(item.count<=1){
            state.cart = state.cart.filter(itemTMP => itemTMP.productId !== action.payload.productId);
          }else{
            item.count--
            item.price-=item.product.price
          }
          
        }
      })
      localStorage.setItem('cart',JSON.stringify(state.cart))
    },
    deleteItem: (state, action) => {
      state.cart = state.cart.filter(item => item.productId !== action.payload.productId);
      localStorage.setItem('cart',JSON.stringify(state.cart))
    },
  },
})

export const { addItem, removeItem, deleteItem, setCart, clearCart } = cart.actions

export default cart.reducer