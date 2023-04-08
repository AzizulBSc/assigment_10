import React from 'react';
<<<<<<< HEAD
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
=======
import { Navigate} from 'react-router-dom';
import useAdminAuth from "../hooks/AdminAuth/useAdminAuth";

function AdminPrivateRoute({children}) {
    const isLoggedInAdmin = useAdminAuth();
    return isLoggedInAdmin?children:<Navigate to="/admin/login" />;
>>>>>>> 89390ce6a28549cea0d250342e783d3e4144a5a9
}

export default AdminPrivateRoute