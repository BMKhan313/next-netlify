import React from 'react'
import {Suspense,lazy} from 'react'

const AccessControl = lazy(()=>import('src/components/access-control/page'))
import SideBar from '@/components/SideBar'
import Header from '@/components/Header'

export default async function page(){
  return (
    <div className="bg-[#EFEFEF] font-poppins flex overflow-y-hidden">
    <div className='flex overflow-hidden w-full'>
        
        {/* <Suspense fallback={<div>Loading...</div>}> */}
         
          <SideBar />
         {/* </Suspense> */}
           <div className='flex flex-col  overflow-y-auto w-[100%]'>
           {/* <Suspense fallback={<div>Loading...</div>}> */}
            <Header />
             {/* </Suspense> */}
           <AccessControl />
           </div>
        </div>
     </div>
   
    
  )
}