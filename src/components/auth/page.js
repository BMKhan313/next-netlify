"use client"

import React, { useState , useEffect} from 'react'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import {userInfo, isLogin }from '../../redux/slice/reduxSlice'
import Swal from "sweetalert2"
import {STG_URL} from '../constants/page'
import { Button } from '@mui/material'
import botnosticlogo from '../assets/botnostic-logo.png'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import { useRouter } from 'next/navigation'
import CryptoJS from 'crypto-js'

const Login = () => {
 
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false);
  // const [token, setToken] = useState('')
  const dispatch = useDispatch()
  const router = useRouter();
  const [state, setState] = React.useState({
    show_login_loading: true,
    type: "default",
    user_id: "",
    user_name: "",
    token: "",
    re_direct: false,
    wrong_credentials: false,
  })
 const initialValues = {
  username: '', password: ''
 }

  const onSubmit = values => {
    // console.log('form', values)
  }
 const validationSchema = yup.object({
    username: yup.string().required('Required'),
    password: yup.string().required('Required')
 })


const handleSubmit = async (values, { setSubmitting, resetForm }) => {
  
  const username = values.username
  const password = values.password
  if(state.show_login_loading){
        Swal.showLoading()
      }
  await fetch(`${STG_URL}/creds-manager/login`,{
    
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: username,
      password: password,
    }),
  })
  .then(response => {
    return response.json()
  })
  .then(function(res) {
   
    setData(res)
    const { user, success } = res
    const email = user.email
    // setToken(res.token)
    // var token = res.token
   

    dispatch(
      userInfo(res)
    )
      
    if(success){
      setState({show_login_loading: false})
      router.push('/cred-dashboard')
      // const token = res.token;
   
      // router.push({
      // pathname: '/cred-dashboard',
      // query: { token: token }, // Pass the token as a query parameter
      // });
      Swal.close();
      
    }else if(success === false){
     
       Swal.fire({
          icon: "error",
          title: res.data[0],
          text:  "Wrong login credentials",
          timer: 10000,
       })
      
    }

  })
  .catch(e => {
    Swal.fire({
      icon: "error",
      title: "Something went wrong!",
      text: "Please check your internet connection",
      timer: 10000,
    })
  })
};
 
  return (
   <div className='w-[90%]'>
     
      <div className='sm:flex items-center justify-between mt-[2rem] ml-7 ' data-testid="auth">
        <div className='mt-[-4rem] sm:mt-[-0rem] mb-[4rem] sm:mb-[0rem]'>
          <Image
            width={220}
            height={220}
            src="/keys-carrying.png"
            alt="Picture of keyscarrying"
            className='w-[70%] sm:w-[80%] sm:h-[35vh] md:h-[40vh] md:w-[90%] '
          />
        </div>
        <Formik className='flex flex-col mt-[2rem] sm:mt-0'
         initialValues={{username: '', password: ''}}
         validationSchema={validationSchema}
         onSubmit={handleSubmit }
        >
          <Form className='flex flex-col md:ml-10 mt-3 sm:mt-0' data-testid="form">
            <h2 className='flex font-bold text-[16px] mb-10'>Credentials Manager</h2>
            <div className='mb-4 flex justify-start items-center'>
              <label className=' text-[16px] w-[6rem] font-regular'>User ID</label>
              <div className='flex flex-col w-[40%] sm:w-auto'>
              <Field className='rounded-[44px] p-[3px] 
              focus:outline-none
             placeholder:text-[#D9D9D9] placeholder:p-[15px] placeholder:text-start'
            data-testid="username" type="email" id="username" name="username"
             placeholder='Username'  
            //  value={username}
             />
             <div className='text-red-600 text-[12px] ml-[0.4rem]'> <ErrorMessage name='username' data-testid="errormsg" /></div>
              </div>
            </div>
            <div className='mb-4 flex justify-start items-center '>
              <label className='font-regular text-[16px] w-[6rem] '>Password</label>
              <div className='flex flex-col w-[40%] sm:w-auto'>
              <Field className='
              rounded-[44px] p-[3px] 
              focus:outline-none placeholder:text-[#D9D9D9] placeholder:p-[15px]'
              data-testid="password" type="password" id="password" name="password"
               placeholder='*******' 
              //  value={password} 
              />
             <div className='text-red-600 text-[12px] ml-[0.4rem]'><ErrorMessage name='password' data-testid="password" /></div> 
              </div>
            </div>
            <div className='flex w-[91%] md:w-[100%] mr-[0rem] md:mr-[1.5rem] md:justify-end sm:justify-center justify-center
            
            '>
              <button 
              // onClick={on_submit}
              type="submit" 
              className='w-[100px] h-[32px] text-[#fff] bg-[#F4B63F] rounded-3xl hover:bg-[#F4B63F]'
              >Login</button>
            </div>
            
          </Form>
        </Formik>
      </div>
      <div className='flex justify-center items-center bg-[#8B8680] fixed bottom-0 w-[100%] h-[50px] '>
       <div className='text-[#fff] font-normal text-[10px] sm:text-[14] '>
        <Image
        src={botnosticlogo}
        width={50}
        height={50}
        alt="footerlogo"
       /> </div> 
       <div className='text-[#fff] font-normal text-[10px] sm:text-[14] ml-2'>©2023 Botnostic Solutions (PVT) Ltd, All Rights Reserved</div>
      </div>
    </div>
    )
}

export default Login
