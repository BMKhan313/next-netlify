

import dynamic from 'next/dynamic';
const ManageAccountsIcon = dynamic(()=> import('@mui/icons-material/ManageAccounts'))
const KeyIcon = dynamic(()=> import('@mui/icons-material/Key'))

export const NavLinks = [
    {id: 1, link: 'cred-dashboard', title: 'Credential Manager', src: <ManageAccountsIcon/> },
    {id: 2,  link: 'access-control', title: 'Access Control', src: <KeyIcon/> },
  ];

 export const STG_URL = "https://edu-stg-rec.mycareerdreams.com/api"