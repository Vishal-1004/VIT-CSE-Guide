import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/NavBar/Navbar";
import Contact from "./Pages/Contact";
import ScrollToTopBtn from "./Components/ScrollToTop/ScrollToTop";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <ScrollToTopBtn />
    </Router>
  );
}

export default App;
