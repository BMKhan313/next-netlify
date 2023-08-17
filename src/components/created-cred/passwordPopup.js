"use client"

import React from 'react'
import { Button } from "@mui/material";
import { Table } from 'antd';
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'

const PasswordPopup = ({openPopPass, setOpenPopPass}) => {
    const columns = [
        {
          title: '#',
          dataIndex: 'sno',
          width: 60
        },
        {
          title: 'Org Code',
          dataIndex: 'orgcode',
        },
        {
          title: 'Org Name',
          dataIndex: 'orgname',
          // render: text => <a>{text}</a>,
        },
        {
          title: 'Super User',
          dataIndex: 'superuser',
        },
        {
          title: 'Admin',
          dataIndex: 'admin',
        },
        {
          title: 'Hr Admin',
          dataIndex: 'hradmin',
        },
      ];
    
      const data = [
        {
          key: '1',
          sno: 1,
          orgname: 'John Brown',
          orgcode: 'org_123',
          superuser: 'super@gmail.com',
          admin: 'admin@gmail.com',
          hradmin: 'hradmin@gmail.com'
        },
        
      ];
  const handleClickOpen = () => {
    setOpenPopPass(true);
  };

  const handleClose = () => {
    setOpenPopPass(false);
  };

  return (
    <div>
      <Button className="bg-[#F4B63F] h-6 p-4 rounded-full text-white font-poppins mr-1" onClick={handleClickOpen}>
        Show Password
      </Button>
      <Dialog
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
        open={openPopPass}
        onClose={handleClose}
      > <Table
            columns={columns}
            dataSource={data}
            bordered
            scroll={{ x: 200 }}
          />
      <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions> 
      </Dialog>
    </div>
  );
}

export default PasswordPopup