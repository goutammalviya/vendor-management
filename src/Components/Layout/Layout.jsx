import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import VendorForm from './../../Pages/VendorForm';

const UnknownURL = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(-1);
  }, [navigate]);
};
const Layout = () => {
  return (
    <div style={{height: "100vh"}}>
      <Routes>
        <Route path="/" element={<VendorForm />} />
        
        <Route path="*" element={<UnknownURL />} />
      </Routes>
    </div>
  );
};

export default Layout;
