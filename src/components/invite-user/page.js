"use client"

import React, { useState } from "react";
import { Button } from "@mui/material";
import Link from 'next/link'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import { STG_URL } from "../constants/page";
import { Radio } from 'antd';
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

const InviteUser = () => {
  
  const [value, setValue] = useState(1);  
  const token = useSelector((state) => state.auth.token)
  var self = "self";

  const handleResetField = () => {
    const updatedData = { ...setValue(), initpassword: '' };
    reset(updatedData); // Reset the specific field field
  };
  
  const onChange = (e) => {
    setValue(e.target.value)
  }
   const initialValues = {
    username: '',
    initpassword: '',
    confirmpassword: ''
   }
  
   const handlesubmit_self = async (values, { setSubmitting, resetForm }) => {
    
     var username = values.username
     var initpassword = values.initpassword
    

// ... other code ...

try {
  const response = await axios.post(`${STG_URL}/creds-manager/invite-user`, {
    email: username,
    password: initpassword,
    url: btoa(window.location.href),
  }, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    }
  });

  const res = response.data;
  const { success } = res;

  if (success) {
    Swal.fire({
      icon: "success",
      title: res.data.msg,
      text: res.data.msg,
      timer: 10000,
    });
  } else {
    Swal.fire({
      icon: "error",
      title: res.data[0],
      timer: 10000,
    });
  }

  if (username === "") {
    Swal.fire({
      icon: "error",
      title: res.data[0].email[0],
      timer: 10000,
    });
  }
} catch (error) {
  const res2 = error.response;
          // console.log('res2',res2.status)
          if(res2.data.message == "Unauthenticated." && res2.status !== 200){
            Swal.close();
            Swal.fire({
              icon: "error",
              title: res2.data.message,
              text: "Token expired",
              timer: 10000,
            });
          }else{
            Swal.fire({
              icon: "error",
              title: "Something went wrong!",
              text: "Failed",
              timer: 10000,
            });
          }
}
 
}
const handlesubmit_create = async (values, { setSubmitting, resetForm }) => {
  
  const password = values.initpassword
 
  try {
    const response = await axios.post(`${STG_URL}/creds-manager/invite-user`, {
      email: username,
      password: password,
      // password_confirmation: ,
      // company_code: ,
      // token: ,
    }, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }
    });
  
    const res = response.data;
    const { success } = res;
    
    if (success) {
      Swal.fire({
        icon: "success",
        title: "Registered",
        text: res.data[0],
        timer: 10000,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: res.data[0],
        timer: 10000,
      });
    }
  
    if (username === "") {
      Swal.fire({
        icon: "error",
        title: res.data[0].email[0],
        timer: 10000,
      });
    }
  } catch (error) {
    const res2 = error.response;
    // console.log('res2',res2.status)
    if(res2.data.message == "Unauthenticated." && res2.status !== 200){
      Swal.close();
      Swal.fire({
        icon: "error",
        title: res2.data.message,
        text: "Token expired",
        timer: 10000,
      });
    }else{
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: "Failed",
        timer: 10000,
      });
    }
  }
  

}

  const validationSchema = yup.object({
    // username: yup.string().required('Required'),
    // initpassword: yup.string().required('Required'),
    confirmpassword: yup.string()
    .oneOf([yup.ref('initpassword'), null], 'Passwords must match')
 })

 const { handleSubmit, control, reset, formState: { errors } } = useForm({
  resolver: yupResolver(validationSchema),
});
  return (
    <div className="flex " data-testid="inviteuser">
   
      <Formik className="h-screen flex-1 justify-start"
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={value === "1" ? handlesubmit_create : handlesubmit_self}
      >
      
        <Form className="mt-5 ml-7">
          <h1 className="font-bold font-poppins">Invite User</h1>
          <div className="flex mt-10 items-center">
            <h5 className="font-poppins">Username/ ID</h5>
            <Field className='bg-[#F5F5F5] h-7 p-3 ml-2 rounded-[2px]
              focus:outline-none
              border-black
              placeholder:p-[15px]'
             data-testid="username" type="text" id="username" name="username" placeholder="Username" 
            //  value={username} onChange={(e)=> setUsername(e.target.value)}
             />
             {/* <div className='text-red-600 text-[12px] ml-6' ><ErrorMessage data-testid="errormsg" name="username">Required</ErrorMessage></div>  */}
          </div>
          <p className="font-normal ml-[7.5rem] mt-3 w-[70%]">Note: A verification email will be sent to this email. User will be able to create a
            passwordby themself after verification. The user will not able
            to invite additional users.</p>

          <div className="flex mt-2" >
            <h5 className="font-poppins mt-2">Password</h5>
          
             <Radio.Group onChange={onChange} value={value} size="large">
           <div className="flex flex-col ml-[2.5rem] mt-[1rem]">
           <Radio value={1} className="font-poppins text-[16px]" >Self service after verification</Radio>
           <Radio value={2} className="font-poppins text-[16px]">Create Initial Password</Radio>
           </div>
               </Radio.Group>

          </div>
          { value == "2" ? (<div className="flex flex-col ml-[7.5rem] mt-4" >
            <div className="flex items-center mb-2">
              <h4 className="w-[10rem]">Initial password</h4>
              <Field className='bg-[#F5F5F5] h-7 p-3 ml-7 rounded-[2px]
              focus:outline-none
              border-black
              placeholder:p-[6px]'
                type="password" id="initpassword" name="initpassword" placeholder="Initial Password"
                // value={password} onChange={(e)=> setPassword(e.target.value)}
                
               />
            </div>
            <div className="flex items-center mb-2">
              <h4 className="w-[10rem]">Confirm Password</h4>
              <Field className='bg-[#F5F5F5] h-7 p-3 ml-7 rounded-[2px]
              focus:outline-none
              border-black
              placeholder:p-[6px]'
                type="password" id="confirmpassword" name="confirmpassword" placeholder="Confirm Password"
               
               />
               <div className='text-red-600 text-[12px] ml-6' ><ErrorMessage data-testid="errormsg" name="confirmpassword" /></div> 
            </div>
          </div>) : ("") }
          
          <div className="flex justify-center ml-[12rem] lg:ml-[3rem] xl:ml-[-12rem] mt-5">
            <Link href="/access-control" className="bg-[#F4B63F] text-white text-[14px] rounded-full mr-2 p-1 px-2">
            <button>Cancel</button></Link>
             <div className="bg-[#F4B63F] text-white text-[14px] rounded-full mr-2 p-1 px-3">
             <button
             type="submit"
            //  onClick={value == "1" ? on_submit_self : on_submit_create}
            >Invite</button>
             </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
export default InviteUser;