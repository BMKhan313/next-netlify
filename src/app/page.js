// "use client"

// import Login from "@/components/auth/page"
import React, {Suspense,lazy } from "react"
// import { } from 'react';
import { useDispatch , useSelector} from "react-redux"
const Login = lazy(()=>import('src/components/auth/page'))


export default function Home() {
  // const user = useSelector((state) => state.auth)
  // console.log(user.value)
    // const dispatch = useDispatch()  
  return (
   <div className='flex overflow-y-hidden '>
 
    <div className="flex h-[100vh] w-[100%] items-center">
     <Suspense fallback={<div>Loading...</div>}>
         <Login />
     </Suspense>
    
    </div>
         
      
    {/* <Comp /> */}
   </div>
  )
}
