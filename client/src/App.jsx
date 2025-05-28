import Login from "./components/Login";
import './App.css'
import FeedbackForm from "./components/FeedbackForm";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import AboutUs from "./components/AboutUs";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
const API = import.meta.env.VITE_API_URL;




import { Routes, Route } from "react-router-dom";



function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/user" element={<UserDashboard />} />
        

         {/* Admin routes */}
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

      </Routes>
    </>
  );
}

export default App;

