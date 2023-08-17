
import dynamic from 'next/dynamic';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import KeyIcon from '@mui/icons-material/Key'
import React from 'react';

export const NavLinks = [
    {id: 1, link: 'cred-dashboard', title: 'Credential Manager', src: <ManageAccountsIcon/> },
    {id: 2,  link: 'access-control', title: 'Access Control', src: <KeyIcon/> },
  ];