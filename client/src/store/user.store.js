import { createSlice } from '@reduxjs/toolkit'

export const user = createSlice({
  name: 'user',
  initialState: {
    userInfo: {},
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
    clearUserInfo: (state, action) => {
      state.userInfo = {}
      localStorage.removeItem('token')
    }
  },
})

export const { setUserInfo, clearUserInfo } = user.actions

export default user.reducer