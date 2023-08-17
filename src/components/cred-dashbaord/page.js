"use client"

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Table } from 'antd';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Space } from 'antd';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Popconfirm } from 'antd';
import Swal from "sweetalert2"
import { STG_URL } from "../constants/page";
import Boxes from "../Boxes";
import { useRouter } from "next/navigation";
import { editUser } from "@/redux/slice/reduxSlice";
import CryptoJS from "crypto-js";

const CredDashboard = () => {
 
 
 
  // const router = useRouter()
  // const { token } = router.query;
  // console.log('token in creddash', token2)
  const [flag, setFlage] = useState(true)
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [open, setOpen] = useState(false);
  const [perPage, setPerPage] = useState(8)
  const [totalPages, setTotalPages] = useState()
  const [type, setType] = useState([])
  const [data, setData] = useState([])
  const [searchResults, setSearchResults] = useState(data);

  const token  = useSelector((state) => state.auth.token)
  //decrypted logic
  // var token2 = localStorage.getItem('token2');
  // var secretKey = 'my-secret-key'
  // var token = CryptoJS.AES.decrypt(token2, secretKey);
  // console.log('my decrypted token',token)

  const dispatch = useDispatch()

  const performCombinedSearch = (() => {

    var filteredData = []
    filteredData = data.filter(

      (item, i) =>
      (
        (item.company_code.toLowerCase().includes(code.toLowerCase()) && (item.company_name.toLowerCase().includes(name.toLowerCase())))
        ||
        ((item.company_name.toLowerCase().includes(name.toLowerCase())) && (item.company_code.toLowerCase().toString().includes(code.toLowerCase().toString())))
      )
    );

    setSearchResults(filteredData);

  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handledit = (record) => {
    dispatch(
      editUser(record)
    )
    router.push('/edit', record)
  }

  const handleClose = () => {
    setOpen(false);
  };
  
  const onClick = ({ key }) => {

    setPerPage(key)
  };
  const handledelete = (record) => {
    // console.log(record)
    fetch(`${STG_URL}/creds-manager/destroy/company-credentials?company_code=${record.company_code}`, {
      // mode: 'no-cors',
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },

    }).then(res => {
      return res.json()
    }).then(function (res) {
      
      const { success } = res
      if (success) {
        setFlage(true)
        Swal.fire({
          icon: "success",
          title: "Deleted",
          text: res.data[0],
          timer: 10000,
        })
      }
    }).catch(e => {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: "Please check your internet connection",
        timer: 10000,
      })
    })
  }

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
  const columns = [

    {
      title: 'Org Code',
      key: 'company_code',
      dataIndex: 'company_code',
    },
    {
      title: 'Org Name',
      key: 'company_name',
      dataIndex: 'company_name',
      // render: text => <a>{text}</a>,
    },
    {
      title: "Admin",
      key: 'admin',
      dataIndex: 'admin',
      // render: (text, record) => (

      //   <div className="flex flex-col">
      //     <div><span>{record.admin}</span></div>
      //     {record.admin && <div ><RemoveRedEyeOutlinedIcon className="text-[18px]" onClick={e => {
      //       handleClickOpen()

      //     }} /> </div>}
      //   </div>
      // ),
    },
    {
      title: "Hr Admin",
      key: 'hradmin',
      dataIndex: 'hradmin',
      // render: (text, record) => (
      //   <div className="flex flex-col">
      //     <span>{record.hradmin}</span>
      //     {record.hradmin && <div><RemoveRedEyeOutlinedIcon className="text-[18px]" onClick={e => { handleClickOpen() }} /> </div>}
      //   </div>
      // ),
    },
    {
      title: "Super Admin",
      key: 'superadmin',
      dataIndex: 'superadmin',
      // render: (text, record) => (
      //   <div className="flex flex-col">
      //     <span>{record.superadmin}</span>
      //     {record.superadmin && <div><RemoveRedEyeOutlinedIcon className="text-[18px]" onClick={e => { handleClickOpen() }} /> </div>}
      //   </div>
      // ),
    },

    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
      fixed: 'right',
      width: 100,
      render: (text, record) => (
        <span className="flex justify-center">
          <a className="text-[16px] mr-2" ><EditRoundedIcon onClick={e => handledit(record)} /></a>
          <Popconfirm
            title="Are you sure you want to delete this Company?"
            onConfirm={() => handledelete(record)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ style: { background: 'red', color: 'white' } }}
          >
            <a className="text-[16px]">
              <DeleteIcon />
            </a>
          </Popconfirm>

        </span>

      ),
    },
  ];

  useEffect(() => {

    fetch(`${STG_URL}/creds-manager/companies?paginationNumber=${perPage}`, {

      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },

    })
      .then(res => {
        return res.json()
      })
      .then(function (res) {

        const array = Object.entries(res.data);

        const companies = [];

        for (const [key, value] of array) {
          companies.push({
            company_code: key.toString(),
            company_name: value.company_name,
            admin: value.admin,
            hradmin: value.hradmin,
            superadmin: value.superadmin
          });
        }
        const { data, success } = res
        
        if (success) {
          setFlage(false)
          setData(companies)
          setSearchResults(companies)
          setPerPage(res.pagination.pagination.per_page)
          setTotalPages(res.pagination.pagination.total)
          // setTotalPages(data.length)
        } else if (!success) {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Something went wrong!",
            text: "Failed",
            timer: 10000,
          })

        }

      })
      .catch(e => {
        Swal.fire({
          icon: "error",
          title: "Something went wrong!",
          text: "Please check your internet connection",
          timer: 10000,
        })
      })
  }, [perPage, flag])



  const clearFilters = () => {
    setCode('')
    setName('')
    setFlage(true)
  }

  return (

    <div className="flex" data-testid="creddashboard">

      <div className="h-screen flex-1 justify-start ">

        <Boxes />
        <div className="block md:flex justify-between md:w-[89%] w-[75%] items-center p-2">
          <div className="flex p-[6px] font-poppins ml-3">
            <h3 className="font-poppins mr-1">Show</h3>
            <p data-testid="showentries" className="bg-slate-700 w-7 h-5 text-[#efefef] text-center">{perPage}</p>
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
            <h3 data-testid="entries" className="font-poppins">Entries</h3>
          </div>
          <div className="ml-[1rem]">
            <Link href='/create-new-cred' className="block w-[90%]   md:flex bg-[#F4B63F] text-white md:w-[100%] rounded-[40px] font-poppins text-[14px]  p-1 px-2 font-medium">
              <button
                className="ml-[6rem] md:ml-[0rem]">Create New Credentials</button>
            </Link>
          </div>
        </div>
        <div className={`block md:flex items-center ml-5 mt-2 justify-between lg:w-[87%] w-[85%]  `}>
          <div className="block lg:flex lg:items-center">
            <h5 className="">Org Code</h5>
            <input className='rounded-[44px] h-7  md:w-[70%] w-[75%] p-[3px] ml-0 lg:ml-1 focus:outline-none'
              type="text" id="search_for_code" name="company_code"
              value={code}
              onChange={(e) => {
                setCode(e.target.value)
                // console.log(e.target.value)
              }}
            />
          </div>
          <div className="block lg:flex lg:items-center">
            <h5 className="">Org Name</h5>
            <input className='rounded-[44px] h-7  md:w-[70%] w-[75%] p-[3px] ml-0 lg:ml-1 focus:outline-none'
              type="text" id="search_for_name" name="company_name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="block md:flex">
            <div className="block mt-5 lg:mt-0 md:mr-1 mr-0">
              <button
                className="bg-[#f4b63f] text-white rounded-[44px] w-[75%] md:w-[100%] text-[14px] font-poppins p-1 font-medium self-center hover:bg-none"
                onClick={performCombinedSearch}
              >Search</button>
            </div>
            <div className="block mt-5 lg:mt-0">
              <button
                className="bg-[#f4b63f] text-white rounded-[44px] w-[75%] md:w-[100%] text-[14px] font-poppins p-1 font-medium self-center hover:bg-none"
                onClick={clearFilters}
              >Clear</button>
            </div>
          </div>

        </div>
        <div className="font-poppins font-normal h-[100vh] md:w-[88%] w-[63%] ml-4 mt-4" data-testid="table">
          <Table
            dataSource={searchResults}
            // dataSource={userData}
            columns={columns}
            rowKey="company_code"
            bordered
            scroll={{ x: 500, y: 400 }}
            pagination={{
              defaultPageSize: 8,
              showTotal: () => `Total records: ${totalPages}`,
              showQuickJumper: false
            }}
          />
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          data-testid="dialogue"
        >
          <DialogTitle id="alert-dialog-title">
            Password
          </DialogTitle>
          <DialogContent className="w-[18rem] mb-[-1rem]">
            <DialogContentText id="alert-dialog-description">
              abcdefghi@123
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Ok</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>


  );
};
export default CredDashboard;

