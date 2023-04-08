import { useSelector } from "react-redux";
export default function useStudentAuth() {
    const auth = useSelector((state) => state.auth);
    if(auth?.accessToken && auth?.user?.role=="student"){
        return true;
    }
    else{
        return false;
    }
}