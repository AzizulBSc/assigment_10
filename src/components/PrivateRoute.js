import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function PrivateRoute({children}) {
  const auth = useSelector((state) => state.auth);
  const role = auth?.user?.role;
  const location = useLocation();
  const path_admin = location.pathname.includes("admin");
  const isLoggedIn = useAuth();
  if(path_admin && role==="admin")
       return isLoggedIn?children:<Navigate to="/admin/login" />;
  else
     return isLoggedIn?children:<Navigate to="/" />
}

export default PrivateRoute