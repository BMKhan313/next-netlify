"use client"

import React,{ useState, useEffect, use } from "react";
import { Table} from 'antd';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import Link from "next/link";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Dropdown, Space } from 'antd';
import { STG_URL } from "../constants/page";
import Swal from "sweetalert2";
import Boxes from "../Boxes";
import { resetPasswordInfo } from "@/redux/slice/reduxSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { returnApiToken } from "@/redux/slice/reduxSlice";
import { companyCode } from "@/redux/slice/reduxSlice";
import axios from "axios";

const AccessControl = () => {
  
  const [perPage, setPerPage] = useState(8) 
  const [totalPages, setTotalPages] = useState()
  const [count, setCount] = useState()
  const [data, setData] = useState([])
  const [filterdData,setFilterData] = useState(data)
   const router = useRouter()
   const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)
  var tableData = [];
  const columns = [
  
    {
      title: 'Code',
      dataIndex: 'company_code',
      width: 40
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 120
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 25,
      render: (text, record) => (
        <span className="flex justify-start">
          <Tooltip title="Reset Password">
            <IconButton onClick={e => resetPassword(record)}>
              <LockResetOutlinedIcon />
             
            </IconButton>
          </Tooltip>
          <Tooltip title="Revoke Access">
            <IconButton className="text-[16px]" onClick={e=>revokeAccess(record)}>
               <LockOutlinedIcon />
            </IconButton>
          </Tooltip>

        </span>
      ),
    },
  ];

  const items = [

    {
      label: 8,
      key: '8',
    },
    {
      label: 13,
      key: '13',

    },
    {
      label: 21,
      key: '21',
    },
    {
      label: 34,
      key: '34',
    },
    {
      label: 55,
      key: '55',
    },
    {
      label: 89,
      key: '89',
    },
    {
      label: 144,
      key: '144',
    },
  ];

  const [toggle, setToggle] = useState(false)
  const [value, setValue] = useState('')
  const [mails, setTotalMails] = useState()

  const resetPassword = (record) => {
    const email = record.email
    const company_code = record.company_code
    dispatch(companyCode(company_code))
    fetch(`${STG_URL}/creds-manager/return-token?email=${email}&company_code=${company_code}`,{
  
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
    })
    .then(res => {
      return res.json()
    })
    .then(function(res) {
      dispatch(returnApiToken(res.data))
      
    }).catch(e => {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: "Please check your internet connection",
        timer: 10000,
      })
    })

    dispatch(resetPasswordInfo(record.email))
    router.push('/recover')
 
  }


  const revokeAccess = (record) => {

    const email = record.email
    const company_code = record.company_code
  fetch(`${STG_URL}/creds-manager/revoke-access?email=${email}&company_code=${company_code}`, {

    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },

  })
    .then(res => {
      return res.json()
    })
    .then(function(resp) {
        
          const {success} = resp
          if(success){
            setToggle(true)
            Swal.fire({
              icon: "success",
              title: "Access Revoked",
              text:  resp.data[0],
              timer: 10000,
           })
          }else{
            
            Swal.fire({
              icon: "error",
              title: "Something1 went wrong rev!",
              text:  "Failed",
              timer: 10000,
           })
          }
          }).catch(function(error) {
              console.log(error);
          });
  }


  const onClick = ({ key }) => {
   
    setPerPage(key)
    
  };

  useEffect(() => {
    
    axios.get(`${STG_URL}/creds-manager/companies?paginationNumber=${perPage}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }
    })
      .then(response => {
        const res = response.data;
    
        const combinedAdmins = [];
        for (const key in res.data) {
          const company = res.data[key];
          if (company.admin) {
            combinedAdmins.push({ company_code: company.company_code, email: company.admin });
          }
          if (company.hradmin) {
            combinedAdmins.push({ company_code: company.company_code, email: company.hradmin });
          }
          if (company.superadmin) {
            combinedAdmins.push({ company_code: company.company_code, email: company.superadmin });
          }
        }
    
        if (res.success) {
          setData(combinedAdmins);
          setFilterData(combinedAdmins);
          setTotalMails(combinedAdmins.length);
          setPerPage(res.pagination.pagination.per_page);
          setTotalPages(res.pagination.pagination.total);
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Something went wrong!",
            text: "Failed",
            timer: 10000,
          });
        }
      })
      .catch(error => {
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
          }else{
            Swal.fire({
              icon: "error",
              title: "Something went wrong!",
              text: "Failed",
              timer: 10000,
            });
          }
      });
  
  
}, [perPage,toggle])

  return (
    <div className="flex" data-testid="accesscontrol">
      <div className="h-screen flex-1 justify-start ">
       <Boxes />
        <div className="block md:flex justify-between w-[93%] items-center p-2">
          <div className="flex p-[6px] font-poppins ml-[2px]">
            <h3 data-testid="show" className="font-poppins mr-1">Show</h3>
            <p className="bg-slate-700 w-7 h-5 text-[#efefef] text-center">{perPage}</p>
            <Dropdown
              menu={{
                items,
                onClick,
                selectable: true
              }}

              trigger={['click']}
              className="-mt-[3px]"
            >
              
              <a onClick={(e) => e.preventDefault()}  className="flex items-center text-white bg-[#F4B63F] h-5 mt-[0.3px] mr-2">
                <Space>
                  <ArrowDropDownIcon />
                </Space>
              </a>
            </Dropdown>
            <h3 className="font-poppins">Entries</h3>
          </div>
          <div className="block md:flex ">
            <h3 className="ml-2">Search</h3>
            <div className="">
            <input className='rounded-[44px] h-7 p-[3px] ml-2 
              focus:outline-none w-[67%] md:w-[90%]
             placeholder:text-[#D9D9D9] placeholder:p-[15px] placeholder:text-start'
              type="text" id="search" name="search" placeholder='Enter Text'
              value={value}
              onChange={e => {
                const currValue = e.target.value;
                setValue(currValue);
                 var results = []
                 results = data.filter(entry =>{
                 return entry.email.toLowerCase().includes(currValue)
                }
                );
          
                setFilterData(results);
              }} />
            </div>
                
       </div>
         <div className="mt-[1rem] md:mt-[0rem] md:w-[30%]">
         <Link href="/invite-user/" className="ml-[0rem] md:ml-[1.3rem] ">
            <button className="bg-[#F4B63F] text-white w-[67%] md:w-[72%] ml-2 rounded-[40px] h-[100%] p-1 font-poppins font-normal text-[14px]">Invite User</button>
          </Link>
         </div>
        </div>
        <div className="font-poppins font-normal h-[100vh] w-[65%] sm:w-[85%] md:w-[87%] ml-3 mt-3">
          <Table
            columns={columns}
            dataSource={filterdData}
            rowKey="email"
            bordered
            scroll={{ x: 500, y: 400 }}
            pagination={{
              defaultPageSize: 8,
              showTotal: () => `Total records: ${mails}`,
              
            }}
            
          />
        </div>
      </div>
    </div>
  );
};

export default AccessControl
