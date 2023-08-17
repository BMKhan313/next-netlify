"use client"

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import botnosticlogo from 'public/botnostic-logo.png'
import Image from 'next/image';
// import { FaUserAlt} from "react-icons/ai";

const Header = ({isLoggedIn}) => {

    const user = useSelector((state) => state.auth)
    
    const dispatch = useDispatch()  
    const [open, setOpen] = useState(false)

  return (
    <div className="bg-[#F5F5F5] relative flex justify-between items-center top-0 h-12 w-full ">
      <Image
      src={botnosticlogo}
      width={120}
      height={60}
      alt='logo'
      className='ml-2'
      />
    <div className="h-[50px] flex justify-end items-center mr-[1rem]" >
      <div className='mr-[1rem]'>
        <Image
          onClick={()=>setOpen(!open)}
          src="https://tecdn.b-cdn.net/img/new/avatars/2.webp"
          width={28}
          height={28}
          className="rounded-full cursor-pointer "
          alt="Avatar"
        />
      </div>
      {open && 
      (<div className='bg-[#ffffff] absolute w-[16rem] h-[13rem] mt-[15rem] rounded-sm shadow-md p-2'>
       <ul >
        <li className='flex justify-center'> 
        <Image
          src="https://tecdn.b-cdn.net/img/new/avatars/2.webp"
          width={100}
          height={100}
          className="rounded-full cursor-pointer "
          alt="Avatar"
        />
        {/* <FaUserAlt /> */}
        </li>
     
        <div className=' p-3 font-light flex flex-col items-center'>
          <h5 className='text-xs'>Baaz Muhammad Khan</h5>
          <h5 className='text-xs'>{user.email}</h5>
        </div>
        <div className='flex justify-between items-end mt-5'>
        <li className='bg-[#F4B63F] rounded-sm font-medium px-2 text-white cursor-pointer font-poppins text-[13px]'>Profile</li>
        <li className='bg-[#F4B63F] rounded-sm font-medium px-2 text-white cursor-pointer font-poppins text-[13px]'>Logout</li>
        </div>
       </ul>
      </div>)}
      <div className="font-medium p-2]">{user.email}</div>
    </div>
  </div>
  )
}

export default Header