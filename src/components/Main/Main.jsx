import React, { useEffect, useState, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "../NavBar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import Profile from "../Profile/Profile.jsx";
import AllComplaints from "../Home/AllComplaints.jsx";
import Login from "../Login/Login.jsx";
import CreateComplaint from "../Create New/CreateComplaint.jsx";
import AboutUs from "../About Us/AboutUs.jsx";
import AuthenticationService from "../Api/AuthenticationService";
import Signup from "../Signup/Signup.jsx";
import ComplaintCard from "../Home/CurrentComplaint/ComplaintCard.jsx";
import OfficerSignup from "../Signup/OfficerSignup.jsx";
import { emptyUser } from "../Profile/Constants.js";

export default function Main() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(emptyUser);
  useEffect(() => {
    console.log("user " + user.role);
    setLoggedIn(AuthenticationService.isUserLoggedIn());
  }, [user.role]);

  return (
    <div>
      <BrowserRouter>
        <Suspense fallback="Loading..."></Suspense>
        {loggedIn && (
          <Navbar loggedIn={loggedIn} user={user} setUser={setUser} />
        )}
        <Routes>
          <Route
            path="i-tracker/login"
            exact
            element={<Login setLoggedIn={setLoggedIn} setUser={setUser} />}
          />
          <Route
            path="i-tracker/signup"
            exact
            element={<Signup setLoggedIn={setLoggedIn} setUser={setUser} />}
          />
          <Route
            path="i-tracker/officer/signup"
            exact
            element={
              <OfficerSignup setLoggedIn={setLoggedIn} setUser={setUser} />
            }
          />
          <Route
            path="i-tracker/users/:profileId/tickets"
            exact
            element={<AllComplaints user={user} />}
          />
          <Route
            path="i-tracker/users/:profileId/complaints/create"
            exact
            element={<CreateComplaint />}
          />
          <Route
            path="i-tracker/users/:profileId/tickets/:ticketId/view"
            exact
            element={<ComplaintCard />}
          />
          <Route
            path="/users/:profileId"
            exact
            element={
              <Profile
                user={user}
                setLoggedIn={setLoggedIn}
                setUser={setUser}
              />
            }
          />
          <Route path="/aboutUs" element={<AboutUs />} />
        </Routes>
      </BrowserRouter>
      {loggedIn && <Footer />}
    </div>
  );
}
