"use client"

import React,{ useState,lazy, useEffect } from "react";
import { Button, Table} from 'antd';
import EditRoundedIcon from '@mui/icons-material/EditRounded'
// import { createdInfo } from "@/redux/slice/reduxSlice";

const PasswordPopup = lazy(()=>import('./passwordPopup'))
import { useDispatch , useSelector} from "react-redux"
import { STG_URL } from "../constants/page";
import Swal from "sweetalert2"
import axios from "axios";

const CreatedCred = () => {

  const [openPopPass, setOpenPopPass] = useState(false);
  const token = useSelector((state) => state.auth.token)
  const mail = useSelector((state) => state.auth.createdemail)
  const companyName = useSelector((state) => state.auth.company_name)
  const company_code = useSelector((state) => state.auth.createdcompany_code)
  const successusers = useSelector((state) => state.auth.successusers)
 
  if(token == undefined){
    Swal.fire({
      icon: "error",
      title: "Unauthenticated",
      text: "Token expired",
      timer: 10000,
    });
  }else{
    var groupedData = {};

successusers?.forEach(item => {
    const { company_code, type, email } = item;
    if (!groupedData[company_code]) {
        groupedData[company_code] = {};
    }
    groupedData[company_code][type] = email;
});

var dataSource = Object.entries(groupedData).map(([companyCode, emails]) => ({
    key: companyCode,
    companyCode,
    ...emails,
    companyName: companyName
}));
  }
  


   const columns = [
    
    {
      title: 'Org Code',
      dataIndex: 'companyCode',
    },
    {
      title: 'Org Name',
      dataIndex: 'companyName',
    },
    {
      title: 'Super User',
      dataIndex: 'superadmin',
    },
    {
      title: 'Admin',
      dataIndex: 'admin',
    },
    {
      title: 'Hr Admin',
      dataIndex: 'hradmin',
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 80,
      render: (text, record) => (
        <span className="flex justify-center">
          <a className="text-[16px]"><EditRoundedIcon /></a>
        </span>
      ),
    },
  ];


  const handleSendViaEmail = async() => {
    try {
      const response = await axios.post(`${STG_URL}/creds-manager/send-via-email`, {
        org_name: companyName,
        org_code: dataSource[0].companyCode,
        admin: dataSource[0].admin || "",
        hrAdmin: dataSource[0].hradmin || "",
        superAdmin: dataSource[0].superadmin || "",
      }, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        }
      });
    
      const res = response.data;
      const success = res.success;
    
      if (success) {
        Swal.fire({
          icon: "success",
          title: "Sent",
          text: res.data[0],
          timer: 10000,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: res.data[0],
          timer: 10000,
        });
      }
    } catch (error) {

      const res2 = error.response;
      // console.log('res2',res2.status)
      if(res2.data.message == "Unauthenticated." && res2.status !== 200){
        Swal.close();
        Swal.fire({
          icon: "error",
          title: res2.data.message,
          text: "Token expired",
          timer: 10000,
        });
      }
    }
    // await fetch(`${STG_URL}/creds-manager/send-via-email`,{
    
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + token
    //   },
    //   body: JSON.stringify({
    //     org_name: companyName,
    //     org_code: dataSource[0].companyCode,
    //     admin: dataSource[0].admin || "",
    //     hrAdmin: dataSource[0].hradmin || "",
    //     superAdmin: dataSource[0].superadmin || ""
    //   }),
    // })
    // .then(response => {
    //   return response.json()
    // })
    // .then(function(res) {
    //   const success = res.success
    //   if(success){
    //     Swal.fire({
    //       icon: "success",
    //       title: "Sent",
    //       text:  res.data[0],
    //       timer: 10000,
    //    })
    //   }else if(!success){
    //     Swal.fire({
    //       icon: "error",
    //       title: res.data[0],
    //       timer: 10000,
    //    })
    //   } 
      
  
    // })
    // .catch(e => {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Something went wrong!",
    //     text: "Please check your internet connection",
    //     timer: 10000,
    //   })
    // })
  }
  

  return (
    <div className="flex">
      <div className="h-screen flex-1 justify-start">
        <div className="font-poppins font-normal w-[92%] ml-6 mt-6">
        <h2 className="mb-5 font-poppins font-semibold">Successfully Created New Credentials</h2>
          <Table
            columns={columns}
            dataSource={dataSource}
            bordered
            scroll={{ x: 500 }}
          />
          <div className="flex justify-end mt-2">
           <button 
           className="bg-[#F4B63F] rounded-full text-white font-medium text-[14px] py-1 px-2 text-center"
           onClick={handleSendViaEmail}>Send Via Email</button>
           
            {/* <PasswordPopup 
            onClick={()=>setOpenPopPass(openPopPass)}
            openPopPass={openPopPass} setOpenPopPass={setOpenPopPass} 
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatedCred;

