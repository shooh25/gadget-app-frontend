import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { AuthProvider } from "./lib/auth";
import Login from "./pages/Login";
import Profile from "./pages/Top";

const App = () => {
  const [user, isLoading] = AuthProvider();
  if (isLoading) {
    return <p>ロード中</p>;
  } else {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Profile />} />
            <Route path="/login" element={user ? <Navigate replace to="/" /> : <Login />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
};

export default App;
