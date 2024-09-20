import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Navigation from "./components/Navigation/Navigation";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/Register";
import ContextProvider from "./context/ContextProvider";
import { ToastContainer } from "react-toastify";
import PrivetRoute from "./components/routes/PrivetRoute";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import EditPost from "./Pages/EditPost/EditPost";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Profile from "./Pages/Profile/Profile";
import UpdateProfile from "./Pages/UpdateProfile/UpdateProfile";
import PrivetRouteUser from "./components/routes/PrivetRouteUser";
import Following from "./Pages/Following/Following";
import Comments from "./Pages/Comments/Comments";
import "./App.css";
// Start App
const App = () => {
  return (
    <ContextProvider>
      <Navigation />
      <ToastContainer position="top-left" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={
            <PrivetRouteUser path="/register">
              <Register />
            </PrivetRouteUser>
          }
        />
        <Route
          path="/login"
          element={
            <PrivetRouteUser path="/login">
              <Login />
            </PrivetRouteUser>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard/editpost/:id" element={<EditPost />} />
        <Route
          path="/dashboard/following"
          element={
            <PrivetRoute>
              <Following />
            </PrivetRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivetRoute>
              <Dashboard />
            </PrivetRoute>
          }
        />
        <Route
          path="/dashpoard/profile"
          element={
            <PrivetRoute>
              <Profile />
            </PrivetRoute>
          }
        />
        <Route
          path="/dashpoard/update-profile"
          element={
            <PrivetRoute>
              <UpdateProfile />
            </PrivetRoute>
          }
        />
        <Route path="/dashboard/comments/:id" element={<Comments />} />
      </Routes>
    </ContextProvider>
  );
};

export default App;
