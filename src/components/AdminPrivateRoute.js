import React from 'react';
import { Navigate} from 'react-router-dom';
import useAdminAuth from "../hooks/AdminAuth/useAdminAuth";

function AdminPrivateRoute({children}) {
    const isLoggedInAdmin = useAdminAuth();
    return isLoggedInAdmin?children:<Navigate to="/admin/login" />;
}

export default AdminPrivateRoute