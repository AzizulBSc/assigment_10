import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PublicRoute({ children }) {
  const isLoggedIn = useAuth();
  const auth = useSelector((state) => state.auth);
  const role = auth?.user?.role;
  const location = useLocation();
  const path_admin = location.pathname.includes("admin");
  if (path_admin&&role==="admin") 
    return !isLoggedIn ? children : <Navigate to="/admin/dashboard"/>;
  else return !isLoggedIn ? children : <Navigate to="/student/player"/>;
}
