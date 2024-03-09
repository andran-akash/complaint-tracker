import Navbar from "../NavBar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import Profile from "../Profile/Profile.jsx";
import Home from "../Home/Home.jsx";
import CreateNew from "../Create New/CreateNew.jsx";
import AboutUs from "../About Us/AboutUs.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function Main() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createnew" element={<CreateNew />} />
          <Route path="/profile" exact element={<Profile />} />
          <Route path="/aboutUs" element={<AboutUs />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}
