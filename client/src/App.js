import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/NavBar/Navbar";
import ScrollToTopBtn from "./Components/ScrollToTop/ScrollToTop";
import Contact from "./Pages/Contact/Contact";
import Home from "./Pages/Home/Home";

// Bootstrap CSS --------------------------------------
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS --------------------------------
import "bootstrap/dist/js/bootstrap.bundle.min";
// React Toastify -------------------------------------
import 'react-toastify/dist/ReactToastify.css';
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Otp from "./Pages/OTP/Otp";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/otp" element={<Otp />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <ScrollToTopBtn />
    </Router>
  );
}

export default App;
