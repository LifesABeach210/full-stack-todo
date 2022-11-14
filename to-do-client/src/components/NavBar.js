/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
export const NavBar = () => {
  return (
    <div>
      <Link to='/todo-form'>Todo</Link>
      <div>
        <Link to='/'>Home</Link>
      </div>
    </div>
  );
};
