"use client"

import React from 'react'
import { Button } from "@mui/material";
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'

const Popup = ({openPop, setOpenPop}) => {

  const handleClickOpen = () => {
    setOpenPop(true);
  };

  const handleClose = () => {
    setOpenPop(false);
  };

  return (
    <div data-testid="emailpopup">
      <button className="bg-[#F4B63F] h-6 p-4 rounded-full text-white font-poppins mr-1" onClick={handleClickOpen}>
        Send Via Email
      </button>
      <Dialog
        open={openPop}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Email Has Successfully been sent to abc123@gmail.com
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Popup