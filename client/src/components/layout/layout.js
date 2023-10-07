import React from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import { Toaster } from 'react-hot-toast';
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main style={{minHeight:"70vh"}}>
      <Toaster />
        {children}</main>    
      <Footer />
    </>
  );
};

export default Layout;
