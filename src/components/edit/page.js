"use client"
import React from 'react'
import { Field,Formik,ErrorMessage, Form } from 'formik'
import { Button } from '@mui/material'
import * as yup from "yup";
import { useSelector } from 'react-redux';

const Edit = (record) => {
  // console.log('editrecord',record)
  const company_code = useSelector((state) => state.auth.company_code)
  const username = useSelector((state) => state.auth.admin)
  const update_password = useSelector((state) => state.auth.update_password)

  const initialValues = {
    username: '', password: ''
   }
  
    const handleSubmit = values => {
      
    }
   const validationSchema = yup.object({
      // username: yup.string().required('Required'),
      update_password: yup.string().required('Required')
   })
  return (
    <div>
      <Formik className='flex flex-col mt-[2rem] sm:mt-0'
         initialValues={{username: `${username}`,  company_code: `${company_code}`, update_password: ''}}
         validationSchema={validationSchema}
         onSubmit={handleSubmit }
        >
          <Form className='flex flex-col ml-10' data-testid="form">
            <h2 className='flex font-bold text-[16px] mb-5'>Edit</h2>
            <div className='mb-4 block w-[60%]'>
              <label className=' text-[16px] mr-6 font-regular ml-2'>Company Code</label>
              <div className='flex flex-col'>
              <Field className='rounded-[44px] p-[3px]
              focus:outline-none
             placeholder:text-[#D9D9D9] placeholder:p-[15px] placeholder:text-start'
            data-testid="company_code" type="text" id="company_code" name="company_code"
             placeholder='Company Code'  
            //  value={company_code}
            readOnly={true}
             />
             <div className='text-red-600 text-[12px] ml-1'> <ErrorMessage name='company_code' data-testid="errormsg" /></div>
              </div>
            </div>
            <div className='mb-4 block w-[60%]'>
              <label className=' text-[16px] mr-6 font-regular ml-2'>Username</label>
              <div className='flex flex-col'>
              <Field className='rounded-[44px] p-[3px]
              focus:outline-none
             placeholder:text-[#D9D9D9] placeholder:p-[15px] placeholder:text-start'
            data-testid="username" type="email" id="username" name="username"
             placeholder='Username'  
            //  value={username}
             readOnly={true}
             />
             <div className='text-red-600 text-[12px] ml-1'> <ErrorMessage name='username' data-testid="errormsg" /></div>
              </div>
            </div>
            <div className='mb-4 w-[60%]'>
              <label className='font-regular text-[16px] ml-2'>Update Password</label>
              <div className='flex flex-col'>
              <Field className='
              rounded-[44px] p-[3px] 
              focus:outline-none placeholder:text-[#D9D9D9] placeholder:p-[15px]'
              data-testid="update_password" type="update_password" id="update_password" name="update_password"
               placeholder='*******' 
              //  value={update_password} 
              />
             <div className='text-red-600 text-[12px] ml-[0.4rem]'><ErrorMessage name='update_password' data-testid="update_password" /></div> 
              </div>
            </div>
            <div className='flex '>
              <button 
              // onClick={on_submit}
              type="submit" 
              className='h-[28px] text-[#fff] bg-[#F4B63F] rounded-3xl hover:bg-[#F4B63F]'
              >Update</button>
            </div>
          </Form>
        </Formik>
    </div>
  )
}

export default Edit