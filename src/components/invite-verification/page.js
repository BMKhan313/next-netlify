"use client"

import React from "react";
import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import Link from 'next/link'
import { STG_URL } from "../constants/page";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const InviteVerification = () => {
  var red_url = ""
  var base_url = ""
  var companycode = "" 
  const router = useRouter()
 
  const [state, setState] = useState({
    redUrl: "",
    baseUrl: "",
    company_code: "",
    email: "",
    token: "",
    confirmPassword: "",
    password: ""
  })
  const onSubmit = values => {
  }
 const validationSchema = yup.object({
    // username: yup.string().required('Required'),
    confirmPassword: yup.string()
    .oneOf([yup.ref('initPassword'), null], 'Passwords must match')
    
 })
 useEffect(() => {
  let key
  if (typeof window !== "undefined") {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    if (urlParams.has("company_code")) {
      companycode = urlParams.get("company_code")
      
      setState((prevState)=>({
        ...prevState,
        company_code: companycode
      }))
    }
    if (urlParams.has("url")) {
      red_url = window.atob(urlParams.get("url"))
    }
    if (urlParams.has("fhx")) {
      key = urlParams.get("fhx")
    }

     base_url = "https://stg-console.mycareerdreams.com"
    setState(prevState=>({
      ...prevState,
      redUrl: red_url,
      baseUrl: base_url,
      // company_code: companycode,
    }))
    if (key !== "") {
      fetch(`${STG_URL}/password/find/${key}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then(response => {
          return response.json()
        })
        .then(function(data) {
          if (data.message === "This password reset token is invalid.") {
            Swal(data.message)
            if (red_url !== "") {
              window.location.assign(red_url)
            } else {
              router.push ("/")
            }
          } else {
            setState((prevState)=>({
              ...prevState,
              token: data.token,
              email: data.email,
            }))
          }
        })
    } else {
      if (red_url !== "") {
       
        window.location.assign(red_url)
      } else {
        router.push ("/")
      }
    }
  }
}, [])

const handleSubmit = async (values, { setSubmitting, resetForm }) => {

  const password = values.initPassword
  const confirmPassword = values.confirmPassword
  
    await fetch(`${STG_URL}/creds-manager/reset`,{
     
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({

        email: state.email,
        password: password,
        password_confirmation: confirmPassword,
        token: state.token,
        red_url: state.redUrl,
        company_code: state.company_code,
      
      }),
    }).then(response=>{
            return response.json()
        })
        .then(function(data) {
          if (
            data.message === "This password reset token is invalid." ||
            data.message === "The given data was invalid."
          ) {
            Swal(data.message)
            
            if (state.redUrl !== "") {
              window.location.assign(state.redUrl)
              // router.push ("https://stg-console.mycareerdreams.com")
            } else {
              router.push ("https://stg-console.mycareerdreams.com")
            }
          } else {
            
            Swal.fire({
              icon: "success",
              title: data.message,
              text: "Redirecting to login page...",
              timer: 10000,
              showConfirmButton: false,
            })
            if (state.redUrl !== "") {
              // localStorage.setItem('redURL',state.redUrl)
              // window.location.assign(state.redUrl)
              router.push ("https://stg-console.mycareerdreams.com")
            } else {
              router.push ("https://stg-console.mycareerdreams.com")
            }
          }
        })
};


  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex justify-around items-center" data-testid="inviteverification">
         <Formik className="h-screen flex-1 justify-start w-[65%]"
         initialValues={{username: '', initPassword: '', confirmPassword: '',  }}
         validationSchema={validationSchema}
         onSubmit={handleSubmit}
         >
          <Form className="mt-[8rem] ">
          <h1 className="font-bold font-poppins">Reset Your Password</h1>
          <div className="flex mt-10 items-center">
            <h5 className="font-poppins w-[10rem]">Username/ ID</h5>
            <Field className='bg-[#F5F5F5] h-7 p-3 rounded-[2px]
              focus:outline-none
              border-black
              placeholder:p-[15px]'
              type="text" id="username" name="username" placeholder="Username"
               data-testid="username"
               readOnly={true}
               value={state.email} 
              //  onChange={(e)=> setUsername(e.target.value)}
               />
               <div className='text-red-600 text-[12px] ml-6' ><ErrorMessage data-testid="errormsg" name="username" /></div> 
          </div>
        <div className="flex flex-col mt-4" >
            <div className="flex items-center mb-2">
              <h4 className="w-[10rem]">New password</h4>
              <Field className='bg-[#F5F5F5] h-7 p-3 rounded-[2px]
              focus:outline-none
              border-black
              placeholder:p-[6px]'
                type="password" id="initPassword" name="initPassword" placeholder="New Password" 
                // value={password} onChange={(e)=> setPassword(e.target.value)}
                />
                 <div className='text-red-600 text-[12px] ml-6' ><ErrorMessage data-testid="errormsg" name="initPassword" /></div>
            </div>
            <div className="flex">
              <h4 className="w-[10rem]">confirm password</h4>
              <Field className='bg-[#F5F5F5] h-7 p-3  rounded-[2px]
              focus:outline-none
              border-black
              placeholder:p-[6px]'
                type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" 
                // value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}
                />
                 <div className='text-red-600 text-[12px] ml-6' ><ErrorMessage data-testid="errormsg" name="confirmPassword" /></div>
            </div>
          </div> 
          <div className="flex justify-end mt-5 w-[100%] content-end">
          <Link href="/access-control" className="bg-[#F4B63F] text-white text-[14px] rounded-full mr-2 w-[auto] px-2 py-[2px]">
          <button >Cancel</button>
          </Link>  
          <div className="bg-[#F4B63F] text-white rounded-full mr-[2rem] px-2 py-[2px] text-[14px] ">
            <button 
          // onClick={on_submit}
            type="submit"
          >Save</button>
          </div>
          </div>
          
        </Form>
      </Formik>
    </div>
   
  );
};
export default InviteVerification;







