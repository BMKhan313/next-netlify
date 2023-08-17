import React from 'react'
import {Suspense} from 'react'

const CreateNewCred = React.lazy(()=>import('src/components/create-new-cred/page'))
import Header from '@/components/Header'
import SideBar from '@/components/SideBar'

const CreateNew = () => {
  return (
    <div className="bg-[#EFEFEF] font-poppins flex overflow-y-hidden">
    <div className='flex overflow-hidden w-full'>
        
          <SideBar />
           <div className='flex flex-col  overflow-y-auto w-[100%]'>
            <Header />
           <CreateNewCred />
           </div>
        </div>
     </div>
    
  )
}

export default CreateNew

