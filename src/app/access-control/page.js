import React from 'react'
import {Suspense,lazy} from 'react'

const AccessControl = lazy(()=>import('src/components/access-control/page'))
import SideBar from '@/components/SideBar'
import Header from '@/components/Header'

export default async function page(){
  return (
    <div className="bg-[#EFEFEF] font-poppins flex overflow-y-hidden">
    <div className='flex overflow-hidden w-full'>
          <SideBar />
           <div className='flex flex-col  overflow-y-auto w-[100%]'>
            <Header />
           <AccessControl />
           </div>
        </div>
     </div>
   
    
  )
}