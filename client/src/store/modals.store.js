import { createSlice } from '@reduxjs/toolkit'

export const modals = createSlice({
  name: 'modals',
  initialState: {
    productModal: false,
    authModal:false,
    cartModal:false,
    snackbarModal:false,
    snackbarSeverity:'success',
    snackbarMessage:'',
    orderModal:false,
    profileModal:false,
    personalModal:false,
    confirmModal:false,
  },
  reducers: {
    setProductModal: (state, action) => {
      state.productModal = action.payload
    },
    setConfirmModal: (state, action) => {
      state.confirmModal = action.payload
    },
    setAuthModal: (state, action) => {
      state.authModal = action.payload
    },
    setCartModal: (state, action) => {
      state.cartModal = action.payload
    },
    setSnackbarModal: (state, action) => {
      state.snackbarModal = action.payload.modal
      state.snackbarMessage = action.payload.message
      state.snackbarSeverity = action.payload.severity
    },
    setOrderModal:(state, action) => {
      state.orderModal = action.payload
    },
    setProfileModal:(state,action) => {
      state.profileModal = action.payload
    },
    setPersonalModal:(state,action) => {
      state.personalModal = action.payload
    },
  },
})

export const { setConfirmModal, setPersonalModal, setProductModal, setAuthModal, setSnackbarModal, setCartModal, setOrderModal, setProfileModal } = modals.actions

export default modals.reducer