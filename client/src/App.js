import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/NavBar/Navbar";
import Contact from "./Pages/Contact";
import ScrollToTopBtn from "./Components/ScrollToTop/ScrollToTop";
import Home from "./Pages/Home";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <ScrollToTopBtn />
    </Router>
  );
}

export default App;
