import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function AdminPrivateRoute({children}) {
  const auth = useSelector((state) => state.auth);
  const role = auth?.user?.role;
  const location = useLocation();
  const path_admin = location.pathname.includes("admin");
  const isLoggedIn = useAuth();
  if(role==="admin")
       return isLoggedIn?children:<Navigate to="/admin/login" />;
  if(isLoggedIn && role==="student")
  return <Navigate to="/student/player" />
}

export default AdminPrivateRoute