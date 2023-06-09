import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { AuthProvider } from "./lib/auth";
import Login from "./pages/Login";
import Top from "./pages/Top";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";

const App: React.FunctionComponent = () => {
  const {currentUser, isLoading} = AuthProvider();
  
  if (isLoading) {
    return <></>;
  } else {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Top />} />
            <Route path="/login" element={currentUser ? <Navigate replace to="/" /> : <Login />} />
            <Route path="/setting" element={currentUser ? <Setting /> : <Navigate replace to="/" />} />
            <Route path={`:user_name`} element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
};

export default App;
