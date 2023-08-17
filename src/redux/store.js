import { configureStore } from '@reduxjs/toolkit'
import  AuthSlice  from './slice/reduxSlice'


export const store = configureStore({
    reducer: {
        // counter: counterSlice,
        auth: AuthSlice
    },
  })