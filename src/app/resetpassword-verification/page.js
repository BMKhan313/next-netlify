import React from 'react'
import {Suspense,lazy} from 'react'

const ResetPasswordVerification = lazy(()=>import('src/components/reset-verification/page'))

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
         <ResetPasswordVerification />
     </Suspense>
    
  )
}

export default page