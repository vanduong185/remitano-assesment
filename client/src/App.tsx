import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthRoute from "./components/AuthRoute";
import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Share from "./pages/Share";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer autoClose={3000} position="bottom-right" />
        <Header />
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/share"
            element={
              <AuthRoute>
                <Share />
              </AuthRoute>
            }
          />
          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
