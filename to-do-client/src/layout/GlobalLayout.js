/** @format */

import React from 'react';
import { Outlet } from 'react-router-dom';

export const GlobalLayout = props => {
  const { NavBar } = props;
  return (
    <div>
      GlobalLayout
      <NavBar />
      <Outlet />
    </div>
  );
};
