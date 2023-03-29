import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <Router>
      <Routes>
        
        {/* student route start */}
        <Route path="/" element={ <StudentLogin/>}/>
        <Route path="/student/add" element={ <StudentRegistration/>}/>
        <Route path="/student/player" element={ <CoursePlayer/>}/>
        <Route path="/student/leaderboard" element={ <Leaderboard/>}/>
        <Route path="/student/quiz" element={ <Quiz/>}/>
        {/* student route end */}

        {/* admin route start */}
        <Route path="/admin/login" element={ <AdminLogin/>}/>
        <Route path="/admin/assignment" element={ <Assignment/>}/>
        <Route path="/admin/assignment/mark" element={ <AssignmentMark/>}/>
        <Route path="/admin/dashboard" element={ <Dashboard/>}/>
        <Route path="/admin/quizzes" element={ <Quizzes/>}/>
        <Route path="/admin/videos" element={ <Videos/>}/>
        {/* admin route End */}
       
    </Routes>
    </Router>
  );
}

export default App;
