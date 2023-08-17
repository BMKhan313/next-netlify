
import React from 'react'
import {Suspense,lazy} from 'react'
const Login = lazy(()=>import('src/components/auth/page'))

const page = () => {
  return (
      <Suspense fallback={<div>Loading...</div>} >
         <Login />
     </Suspense>
 
    
  )
}

export default page

