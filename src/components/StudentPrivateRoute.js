import React from 'react';
import { Navigate} from 'react-router-dom';
import useStudentAuth from "../hooks/StudentAuth/useStudentAuth";

function StudentPrivateRoute({children}) {
    const isLoggedInStudent = useStudentAuth();
    return isLoggedInStudent?children:<Navigate to="/" />;
}

export default StudentPrivateRoute