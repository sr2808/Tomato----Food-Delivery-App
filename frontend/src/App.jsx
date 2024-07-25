import React, { useState, useEffect, useContext } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Footer from "./components/Footer";
import SignIn from "./pages/SignUp";
import Login from "./pages/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StoreContext } from "./context/StoreContext";
import Verify from "./pages/Verify";
import MyOrders from "./pages/MyOrders";

const App = () => {

  return (
    <>
      <div className="app w-full mx-auto sm:w-[90%]">
         {/* {navbarEnable && <Navbar /> } */}
         <ToastContainer/>
         <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<PlaceOrder />} />
          <Route path="/signup" element={<SignIn />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders/>} />
        </Routes>
      </div>
      {/* {footerEnable && <Footer />} */}
      <Footer/>

    </>
  );
};

export default App;
