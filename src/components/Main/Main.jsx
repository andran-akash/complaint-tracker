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
import ViewComplaint from "../Home/ViewComplaint.jsx";
import OfficerSignup from "../Signup/OfficerSignup.jsx";
import { emptyUser } from "../Profile/Constants.js";
import UpdateComplaint from "../Home/UpdateComplaint.jsx";
import ComplaintsTableView from "../Admin/ComplaintsTableView.jsx";

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
            element={<ViewComplaint />}
          />
          <Route
            path="i-tracker/users/:profileId/tickets/:ticketId/update"
            exact
            element={<UpdateComplaint user={user} />}
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
          <Route
            path="/aboutUs/:profileId"
            element={<ComplaintsTableView user={user} />}
          />
        </Routes>
      </BrowserRouter>
      {loggedIn && <Footer />}
    </div>
  );
}
