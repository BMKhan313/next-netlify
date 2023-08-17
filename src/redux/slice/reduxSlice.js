"use client"

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 0,
    openPop: false,
    isLogin: false,
    user_info: {
      type: "",
      token: "",
      user_name: "",
      email: "",
      user_id: "",
      institution_code: "",
    }

  }

  export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
  
      /* The `userInfo` reducer in the `authSlice` is updating the `email` property in the state with
      the payload value passed to it. */
      userInfo: (state, action) => {
        state.email = action.payload.user.email,
        state.token = action.payload.token
      },
      
      createdInfo : (state, action) => {
        state.successusers = action.payload
        state.createdemail = action.payload.email,
        state.createdcompany_code = action.payload.company_code
      },
      resetPasswordInfo: (state, action) => {
        state.resetpasswordemail = action.payload
        // state.resetpasswordemail = action.payload
      },
      returnApiToken:(state, action) => {
        state.returnApiToken = action.payload
      },
      companyCode:(state, action) => {
        state.company_code = action.payload
      },
      orgName: (state, action) => {
        state.company_name = action.payload
      },
      editUser: (state, action) => {
         state.company_code = action.payload.company_code,
         state.admin = action.payload.admin
      },
      isLogin: (state, action) => {
         state.isLogin = action.payload
      } ,
      increment: (state) => {
        state.value += 1
      },
      LogoutPopup: (state, action) => {
        state.openPop = action.payload
      },
      decrement: (state) => {
        state.value -= 1
      },
      incrementByAmount: (state, action) => {
        state.value += action.payload
      },
      
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { increment, decrement, incrementByAmount, LogoutPopup,
    userInfo, isLogin, editUser, createdInfo,resetPasswordInfo,returnApiToken, orgName,companyCode } = authSlice.actions
  
  export default authSlice.reducer