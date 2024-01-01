// UserRoot.tsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
const UserRoot: React.FC = () => {

  return (
    <>
      <Navbar />
      <Outlet/>
    </>
  );
};

export default UserRoot;
