import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "../pages/About";
import HomePage from "../pages/HomePage";
import PageNotFound from "../pages/PageNotFound";
import Policy from "../pages/policy";
import Contact from "../pages/contact";
import "../App.css";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/login";
import Dashboard from "../pages/user/Dashboard";
import PrivateRoute from "../Routes/Private";
import ForgotPass from "../pages/Auth/forgotPass";
import AdminRoute from "../Routes/AdminRoute";
import AdminDashboard from "../pages/Admin/adminDashboard";
import CreateCategory from "../pages/Admin/CreateCategory";
import CreateProduct from "../pages/Admin/CreateProduct";
import AllUsers from "../pages/Admin/AllUsers";
import Profile from "../pages/user/Profile";
import Order from "../pages/user/Order";
import Products from "../pages/Admin/Products";

const AppRouter = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<PrivateRoute />} >

          <Route path="user" element={<Dashboard />}/>
          <Route path="user/profile" element={<Profile />}/>
          <Route path="user/order" element={<Order />}/>

          </Route>
          <Route path="/dashboard" element={<AdminRoute />} >

          <Route path="admin" element={<AdminDashboard />}/>
          <Route path="admin/category" element={<CreateCategory />}/>
          <Route path="admin/allusers" element={<AllUsers />}/>

          <Route path="admin/product" element={<CreateProduct/>}/>
          <Route path="admin/products" element={<Products/>}/>

          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/forgotpass" element={<ForgotPass />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
