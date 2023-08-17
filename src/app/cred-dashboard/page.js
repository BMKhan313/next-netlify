// "use client"

// import React from 'react'
import React,{Suspense,lazy} from 'react'

const CredDashboard = lazy(()=>import('src/components/cred-dashbaord/page'))
import SideBar from '@/components/SideBar'
import Header from '@/components/Header'
import { useRouter } from 'next/navigation'

const page = () => {


 
  return (
    <div className="bg-[#EFEFEF] font-poppins flex overflow-y-hidden">
   <div className='flex overflow-hidden w-full'>
       
        <SideBar />
          <div className='flex flex-col  overflow-y-auto w-[100%]'>
           <Header /> 
          <CredDashboard  />
          </div>
       </div>
    </div>
       
    
  )
}

export default page