import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/register/Register";
import BusinessRegister from "./components/register/BusinessRegister";
import UserRegister from "./components/register/UserRegister";
import DetailsBusiness from "./components/register/DetailsBusiness";
import UserAccueil from "./components/accueilUser/UserAccueil";
import GetBussines from "./components/accueilUser/GetBussines";
import AdminDashboard from "./components/accueilBusiness/AdminDashboard";
import LoginUser from "./components/login/LoginUser";
import LoginBusiness from "./components/login/LoginBusiness";
import { SaveProvider } from "./components/accueilUser/SaveContext"; 
import Save from "./components/accueilUser/Save";
import Requests from "./components/accueilBusiness/Requests";
import ProfileBusiness  from "./components/accueilBusiness/ProfileBusiness";

function App() {
  return (
    <SaveProvider> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/business-register" element={<BusinessRegister />} />
          <Route path="/detailsBusiness" element={<DetailsBusiness />} />
          <Route path="/user-register" element={<UserRegister />} />
          <Route path="/UserAccueil" element={<UserAccueil />} />
          <Route path="/user-login" element={<LoginUser />} />
          <Route path="/business-login" element={<LoginBusiness />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/business/:id" element={<GetBussines />} />
          <Route path="/saved" element={<Save />} /> 
          <Route path="/requestB" element={<Requests />} /> 
          <Route path="/profileB" element={<ProfileBusiness  />} /> 
      
        </Routes>
      </BrowserRouter>
    </SaveProvider> 
  );
}

export default App;
