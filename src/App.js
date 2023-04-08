import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import StudentPrivateRoute from "./components/StudentPrivateRoute";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import PublicRoute from "./components/PublicRoute";
import useAuthCheck from "./hooks/useAuthCheck";
import AdminLogin from "./pages/admin/AdminLogin";
import Assignment from "./pages/admin/Assignment";
import AssignmentMark from "./pages/admin/AssignmentMark";
import Dashboard from "./pages/admin/Dashboard";
import Quizzes from "./pages/admin/Quizzes";
import Videos from "./pages/admin/Videos";
import CoursePlayer from "./pages/student/CoursePlayer";
import Leaderboard from "./pages/student/Leaderboard";
import Quiz from "./pages/student/Quiz";
import StudentLogin from "./pages/student/StudentLogin";
import StudentRegistration from "./pages/student/StudentRegistration";

function App() {  const authChecked = useAuthCheck();

  return !authChecked ? (
      <div>Checking authentication....</div>
  ) : (<Router>
      <Routes>
        
        {/* student route start */}
        <Route path="/" element={ <PublicRoute><StudentLogin/></PublicRoute> }/>
        <Route path="/student/add" element={ <PublicRoute><StudentRegistration/></PublicRoute>}/>
        <Route path="/student/player" element={ <StudentPrivateRoute><CoursePlayer/></StudentPrivateRoute>}/>
        <Route path="/student/leaderboard" element={ <StudentPrivateRoute><Leaderboard/></StudentPrivateRoute>}/>
        <Route path="/student/quiz/:id" element={ <StudentPrivateRoute><Quiz/></StudentPrivateRoute>}/>
        {/* student route end */}

        {/* admin route start */}
        <Route path="/admin/login" element={ <PublicRoute><AdminLogin/></PublicRoute>}/>
        <Route path="/admin/assignment" element={ <AdminPrivateRoute><Assignment/></AdminPrivateRoute>}/>
        <Route path="/admin/assignment/mark" element={ <AdminPrivateRoute><AssignmentMark/></AdminPrivateRoute>}/>
        <Route path="/admin/dashboard" element={ <AdminPrivateRoute><Dashboard/></AdminPrivateRoute>}/>
        <Route path="/admin/quizzes" element={ <AdminPrivateRoute><Quizzes/></AdminPrivateRoute>}/>
        <Route path="/admin/videos" element={ <AdminPrivateRoute><Videos/></AdminPrivateRoute>}/>
        {/* admin route End */}
       
    </Routes>
    </Router>
  );
}

export default App;
