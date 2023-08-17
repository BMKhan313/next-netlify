import React,{useState,useEffect} from 'react'
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import { STG_URL } from "../components/constants/page";
import axios from "axios";
import { useSelector } from 'react-redux';

const Boxes = () => {

    const [companyCount, setCompanycount] = useState()
    const [userCount, setUsercount] = useState()
    const [completedChatsCount, setCompletedChatscount] = useState()
    const token = useSelector((state) => state.auth.token)
    const orgArray = [
        {org: companyCount, src: CorporateFareIcon, bg: '#2B8CBE', name: 'Company Count'},
        {org:  completedChatsCount, CorporateFareIcon, bg:'#A6BDDB', name: 'Completed Chats'},
        {org: userCount, src: CorporateFareIcon, bg:'#ECE7F2', name: 'User Count'}
          ]
          useEffect(() => {
    
            axios.get(`${STG_URL}/creds-manager/total-count`,{
              headers: {
                Authorization: "Bearer " + token
              }
            })
            .then(function(resp) {
                  if(resp.data.success){
                    setCompanycount(resp.data.data[0].companyCount);
                    setCompletedChatscount(resp.data.data[0].completedChatsCount)
                    setUsercount(resp.data.data[0].userCount)
                  }else{
                    Swal.fire({
                      icon: "error",
                      title: "Something went wrong!",
                      text:  "Failed",
                      timer: 10000,
                   })
                  }
                  }).catch(function(error) {
                      console.log(error);
                  });
      
          
        }, [])
  return (
    <div className="flex pt-[18px] pl-[18px] w-[66%] md:w-[93%]">
         { orgArray.map((box,index)=>(
          <div key={index} className={`flex flex-col justify-center items-center bg-[${box.bg}] w-[75%] md:w-[31%] h-[160px]  mr-2 shadow-lg`}>
          
            <CorporateFareIcon className="text-[50px] md:text-[80px] text-white" />
            <p className="font-poppins  text-[#817b7b] font-normal text-[10px] md:text-[16px] ">{box.name}</p>
            <p className="font-poppins text-[#817b7b] font-medium text-[10px] md:text-[16px]">{box.org} +</p>
           </div>
         )) 
          }
        </div>
  )
}

export default Boxes