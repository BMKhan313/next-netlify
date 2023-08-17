"use client"

import React,{useState} from 'react'
import { NavLinks } from '@/app/constants';
import { useParams, useRouter } from "next/navigation";
import dynamic from 'next/dynamic';
//dynamic
import Link from 'next/link'
import MenuIcon from '@mui/icons-material/Menu'

const SideBar = ({href=""}) => {
  
  const params = useParams()

  const router = useRouter();
  const { asPath } = router;

  const [open, setOpen] = useState(true);
  
  return (
    <div
        className={` ${open ? "w-[14rem]" : "w-[3rem]"} bg-[#ffffff] h-[100vh] left-0 p-3 relative pt-2 duration-200 ease-in-out `}
      >
        <MenuIcon
        className={`absolute cursor-pointer font-bold top-[1rem] w-9 border-dark-purple
         ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
        />
        <ul className="pt-40">
          {NavLinks.map((navlink, index) => (
           <div 
           key={navlink.id} >
            <Link 
             href={`/${navlink.link}`}
           
             className={`flex p-[4px] pl-[2px] cursor-pointer items-center gap-x-1`}
             >
              <span className=''>{navlink.src}</span>
             
              <span className={`${!open && "hidden"} origin-left text-[12px] font-bold `} key={navlink.id} >
                {navlink.title}
              </span> 
            </Link>
           </div>
            
          ))}
        </ul>
      </div>
  )
}

export default SideBar