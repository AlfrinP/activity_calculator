import Dashboard from "./components/Dashboard/Dashboard";
import Faculty from "./components/Dashboard/Faculty";
import Student from "./components/Dashboard/Student";
import Login from "./components/Login/Login";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import SignUp from "./components/Login/SignUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<SignUp />} />
        <Route path="dashboard" element={<Dashboard/>}>
          <Route path="student" element={<Student />} />
          <Route path="faculty" element={<Faculty />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
