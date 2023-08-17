import React from 'react'
import {Suspense,lazy} from 'react'

const InviteVerification = lazy(()=>import('src/components/invite-verification/page'))

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
         <InviteVerification />
     </Suspense>
    
  )
}

export default page