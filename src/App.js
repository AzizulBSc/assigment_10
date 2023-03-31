import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
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
        <Route path="/student/player" element={ <PrivateRoute><CoursePlayer/></PrivateRoute>}/>
        <Route path="/student/leaderboard" element={ <PrivateRoute><Leaderboard/></PrivateRoute>}/>
        <Route path="/student/quiz" element={ <PrivateRoute><Quiz/></PrivateRoute>}/>
        {/* student route end */}

        {/* admin route start */}
        <Route path="/admin/login" element={ <PublicRoute><AdminLogin/></PublicRoute>}/>
        <Route path="/admin/assignment" element={ <PrivateRoute><Assignment/></PrivateRoute>}/>
        <Route path="/admin/assignment/mark" element={ <PrivateRoute><AssignmentMark/></PrivateRoute>}/>
        <Route path="/admin/dashboard" element={ <PrivateRoute><Dashboard/></PrivateRoute>}/>
        <Route path="/admin/quizzes" element={ <PrivateRoute><Quizzes/></PrivateRoute>}/>
        <Route path="/admin/videos" element={ <PrivateRoute><Videos/></PrivateRoute>}/>
        {/* admin route End */}
       
    </Routes>
    </Router>
  );
}

export default App;
