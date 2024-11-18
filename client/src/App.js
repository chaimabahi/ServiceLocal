import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import BusinessRegister from "./components/BusinessRegister";
import DetailsBusiness from "./components/DetailsBusiness";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/business-register" element={<BusinessRegister />} />
        <Route path="/detailsBusiness" element={<DetailsBusiness />} />
      </Routes>
      </BrowserRouter>
  );
}

export default App;
