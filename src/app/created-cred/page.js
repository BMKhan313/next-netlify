import React from 'react'
import {Suspense} from 'react'

const CreatedCred = React.lazy(()=>import('src/components/created-cred/page'))
import SideBar from '@/components/SideBar'
import Header from '@/components/Header'

const CreateNew = () => {
  return (
    <div className="bg-[#EFEFEF] font-poppins flex overflow-y-hidden">
    <div className='flex overflow-hidden w-full'>
        
          <SideBar />
           <div className='flex flex-col  overflow-y-auto w-[100%]'>
            <Header />
           <CreatedCred />
           </div>
        </div>
     </div>
    
  )
}

export default CreateNew