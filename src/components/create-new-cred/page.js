"use client"

import Link from 'next/link'
import { STG_URL } from '../constants/page'
import { useState } from "react";
import Swal from "sweetalert2";
import { Checkbox } from 'antd';
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { createdInfo, orgName } from "@/redux/slice/reduxSlice";
import { useEffect } from "react";
import { Select,Form } from 'antd';
import axios from 'axios';
const { Option } = Select;


const CreateNewCred = () => {
  
  const [orgcode, setOrgcode] = useState()
  const [orgname, setOrgname] = useState('')
  const [checkValue, setCheckValue] = useState(['admin'])
  const [organizations, setOrganizations] = useState()
  const router = useRouter()
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)
  const onChange = (checkedValues) => {

    setCheckValue(checkedValues)

  };

  const options = [
    {
      label: 'Hr Admin',
      value: 'hradmin',
    },
    {
      label: 'Admin',
      value: 'admin',
    },
    {
      label: 'Super User',
      value: 'superadmin',
    },
  ];
  useEffect(() => {
    const fetchOrgs = async () => {
      axios.get(`${STG_URL}/creds-manager/organizations`, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + token,
        }
      })
        .then(response => {
          const res = response.data;
          setOrganizations(res.data);
        })
        .catch(error => {
          // console.log('err..',error);
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
        });
    }
    fetchOrgs()
      .catch(console.error)
  }, [])

  const on_submit = async e => {

    e.preventDefault();
    if (!orgcode) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Organization Code Required',
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: "CLOSE"
      });
      return;
    }
   
    await fetch(`${STG_URL}/creds-manager/register`, {

      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        company_code: orgcode,
        type: checkValue
      }),
    }).then(response => {
      return response.json()
    })
      .then((res) => {
        dispatch(orgName(orgname))
        // Check if any creation was successful
        const anySuccess = res.some((item) => item.success === true);

          if (anySuccess) {
            const successUsers = res.filter((item) => item.success === true).map((item) => item.data.user);
         
            dispatch(createdInfo(successUsers));
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: "Success",
              text: `${successUsers.length} User(s) Created Successfully`,
              showConfirmButton: true,
              timer: 2000
            });
            router.push('/created-cred');
          } else {
            const errorMsg = res.find((item) => item.success === false).data;
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: "Error",
              text: errorMsg,
              showConfirmButton: false,
              showCancelButton: true,
              cancelButtonColor: '#d33',
              cancelButtonText: "CLOSE"
            });
          }
      
      }).catch(function (error) {
        console.log(error);
      });

  }
  const handleChange = (event) => { }

  const handleOrgCodeChange = (value, option) => {
    if (option) {
      const organization = organizations.find(
        (org) => org.company_code === value
      );

      if (organization) {
        setOrgcode(value);
        setOrgname(organization.company_name);
      } else {
        setOrgcode(value);
        setOrgname('');
      }
    } else {
      setOrgcode(value);
      setOrgname('');
    }
  };



  return (
    <div className="flex" data-testid="createnewcred">

      <div className="h-screen flex-1 justify-start ml-[3rem] mt-[2rem]">
        <Form >
          <div className="flex mb-3">
            <h5 className="w-[7rem]">Org Code</h5>

            <Select
              className='rounded-[44px] h-7 p-[3px] ml-2 w-[60%] sm:w-[55%] md:w-[40%] ant-select-selection'
              showSearch
              placeholder="Select an organization code"
              optionFilterProp="children"
              value={orgcode}
              onChange={handleOrgCodeChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {organizations?.map((org) => (
                <Option key={org.company_code} value={org.company_code}>
                  {org.company_code}
                </Option>
              ))}
            </Select>
          </div>
          <div className="flex">
            <h5 className="w-[7rem]">Org Name</h5>
            <input className='rounded-[44px] h-[1.8rem] p-[0.7rem] ml-3  focus:outline-none
             placeholder:text-[#D9D9D9] text-[14px] placeholder:p-[15px] w-[59%] sm:w-[54%] md:w-[39%] border'
              type="text" id="orgname" name="orgname"
              value={orgname} readOnly={true}
              onChange={handleChange}
            />
          </div>
          <div className="mt-8 w-[60%]">
            <h4 className="font-normal">User To Create</h4>
            <div className="flex flex-col justify-start">
              <Checkbox.Group className="flex flex-col ml-[8rem] text-[16px]" size="large"
                options={options} defaultValue={['admin']} onChange={onChange} required={true} />

            </div>
            <div className="flex justify-center mt-5 ">
              <Link href="/cred-dashboard/" className="bg-[#F4B63F] text-white text-[14px] rounded-full mr-2 p-1 px-2">
                <button title="cancel" >Cancel</button>
              </Link>
              <div className="bg-[#F4B63F] text-white text-[14px] rounded-full mr-2 p-1 px-2">
                {/* <button
                  onClick={on_submit}
                  type="button" >Create</button> */}
                   <button type="submit" onClick={on_submit} >Submit</button>
              </div>



            </div>
          </div>
        </Form>
      </div>
    </div>

  );
};
export default CreateNewCred;
