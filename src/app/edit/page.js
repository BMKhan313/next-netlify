// import React from 'react'
import React,{Suspense,lazy} from 'react'

const Edit = lazy(()=>import('src/components/edit/page'))
import SideBar from '@/components/SideBar'
import Header from '@/components/Header'

const page = () => {
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
         <Edit />
          </div>
       </div>
    </div>
       
    
  )
}

export default page