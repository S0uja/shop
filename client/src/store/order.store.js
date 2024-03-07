import { createSlice } from '@reduxjs/toolkit'

export const order = createSlice({
  name: 'order',
  initialState: {
    orders: [],
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload
    },
    clearOrders: (state, action) => {
      state.orders = []
    }
  },
})

export const { setOrders, clearOrders } = order.actions

export default order.reducer