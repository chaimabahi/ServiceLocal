import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/register/Register";
import BusinessRegister from "./components/register/BusinessRegister";
import UserRegister from "./components/register/UserRegister";
import DetailsBusiness from "./components/register/DetailsBusiness";
import UserAccueil from "./components/accueilUser/UserAccueil";

import LoginUser from "./components/login/LoginUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/business-register" element={<BusinessRegister />} />
        <Route path="/detailsBusiness" element={<DetailsBusiness />} />
        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/UserAccueil" element={<UserAccueil />} />
        <Route path="/loginuser" element={<LoginUser />} />
      </Routes>
      </BrowserRouter>
  );
}

export default App;
