import { configureStore } from '@reduxjs/toolkit'
import cartReduser from './cart.store'
import categoriesReduser from './categories.store'
import productsReduser from './products.store'
import modalsReduser from './modals.store'
import userReduser from './user.store'
import orderReduser from './order.store'

export const store = configureStore({
  reducer: {
    cart: cartReduser,
    categories: categoriesReduser,
    products: productsReduser,
    modals: modalsReduser,
    user: userReduser,
    order: orderReduser,
  },
})