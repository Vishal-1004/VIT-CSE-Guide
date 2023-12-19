import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/NavBar/Navbar";
import ScrollToTopBtn from "./Components/ScrollToTop/ScrollToTop";
import Contact from "./Pages/Contact/Contact";
import Home from "./Pages/Home/Home";
import { userData } from "./Services/Apis";

// Bootstrap CSS --------------------------------------
//import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS --------------------------------
//import "bootstrap/dist/js/bootstrap.bundle.min";
// React Toastify -------------------------------------

// mutli carousel style -------------------------
import "react-multi-carousel/lib/styles.css";
// ---------------------------------------------
import "react-toastify/dist/ReactToastify.css";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Otp from "./Pages/OTP/Otp";
import Messages from "./Pages/Messages/Messages";
import { useEffect, useState } from "react";
import Users from "./Pages/Users/Users";
import Footer from "./Components/Footer/Footer";
import Studymaterials from "./Components/StudyMaterialCard/StudyMaterials";
import AddSubject from "./Pages/Material/AddSubject";
import AddStudyMaterial from "./Pages/Material/AddStudyMaterial";
import AddPaper from "./Pages/Material/AddPaper";
import AddRefVdo from "./Pages/Material/AddRefVdo";
import Error from "./Pages/Error/Error";

function App() {
  const [admin, setAdmin] = useState(false);
  const isLoggedIn = sessionStorage.getItem("loggedIn");
  const userToken = sessionStorage.getItem("userdbtoken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getUserData = await userData({ token: userToken });

        // Set the fetched user data to the component state
        if (getUserData.status === 200) {
          setAdmin(getUserData.data.data.isAdmin);
          //console.log("User is admin : ", admin);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Check if the user is logged in before making the API call
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn, userToken]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/otp" element={<Otp />} />
        <Route
          path="/studymaterial"
          element={isLoggedIn ? <Studymaterials /> : <Login />}
        />
        <Route
          path="/addstudymaterial"
          element={
            isLoggedIn ? admin ? <AddStudyMaterial /> : <Home /> : <Login />
          }
        />
        <Route
          path="/addpaper"
          element={isLoggedIn ? admin ? <AddPaper /> : <Home /> : <Login />}
        />
        <Route
          path="/addrefvdo"
          element={isLoggedIn ? admin ? <AddRefVdo /> : <Home /> : <Login />}
        />
        <Route
          path="/addsubject"
          element={isLoggedIn ? admin ? <AddSubject /> : <Home /> : <Login />}
        />
        <Route path="/contact" element={isLoggedIn ? <Contact /> : <Login />} />
        <Route
          path="/messages"
          element={isLoggedIn ? admin ? <Messages /> : <Home /> : <Login />}
        />
        <Route
          path="/users"
          element={isLoggedIn ? admin ? <Users /> : <Home /> : <Login />}
        />
      </Routes>
      <Footer />
      <ScrollToTopBtn />
    </Router>
  );
}

export default App;
