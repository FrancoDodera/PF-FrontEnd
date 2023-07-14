import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Carsforsale from "./components/Carsforsale/Carsforsale";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.baseURL = "https://pf-back.fly.dev/";
import Detail from "./components/Detail/Detail";
import Home from "./components/home/Home";
import UserDetail from "./components/UserDetail/UserDetail.jsx";
import Landing from "./components/Landing/Landing";
//admin
import AdminHome from "./components/Admin/AdminHome/AdminHome";
import Brand from "./components/Admin/Brand/Brand";
import Car from "./components/Admin/Car/Car";
import Category from "./components/Admin/Category/Category";
import User from "./components/Admin/User/User";
import Sale from "./components/Admin/Sale/Sale";
import "../src/App.css";


function App() {
  const navigate = useNavigate();
  const localUser = localStorage.getItem("user");
  const localAdmin = localStorage.getItem("admin");
  const localGuest = localStorage.getItem("guest");
  const validationLogin = async () => {
    if (!localUser) {
      if (!localGuest) {
            if(!localAdmin){
              navigate("/login");
            }else{
              const { data } = await axios.post("/user/verifyUser", {
                user: localAdmin,
              });
              if(!data.acces){
                localStorage.clear();
                navigate("/login");
              }else{
                if(data.data.type=="Admin"){
                }else{
                  localStorage.clear();
                  navigate("/login");
                }
              }
            }
      }else{
        
      }
    } else {
      const { data } = await axios.post("/user/verifyUser", {
        user: localUser,
      });
      if (!data.acces) {
        localStorage.clear();
        navigate("/login");
      } else {
        if (data.data.type == "User") {
          
        } else{
          localStorage.clear();
          navigate("/login");
        }
      }
    }
  };
  
  useEffect(() => {
    const validation = async () => {
      await validationLogin();
    };
    validation();
  }, []);
  return (
    <main className="App">
      {
        !localUser && !localAdmin && !localGuest && <Routes><Route exact path="/register" element={<Register />} /><Route exact path="/login" element={<Login />} /></Routes>
      }
      {
        localUser && <Routes><Route exact path="/" element={<Landing />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/carsforsale" element={<Carsforsale />} />
        <Route exact path="/detail/:id" element={<Detail />} />
        <Route exact path="/userDetail" element={<UserDetail />} /></Routes>
      }
      {
        localGuest && <Routes><Route exact path="/" element={<Landing />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/carsforsale" element={<Carsforsale />} />
        <Route exact path="/detail/:id" element={<Detail />} />
        <Route exact path="/userDetail" element={<UserDetail />} /></Routes>
      }
      {
        localAdmin && <Routes><Route exact path="/" element={<Landing />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/carsforsale" element={<Carsforsale />} />
          <Route exact path="/detail/:id" element={<Detail />} />
          <Route exact path="/userDetail" element={<UserDetail />} />
          <Route exact path="/admin" element={<AdminHome />} />
          <Route exact path="/admin/user" element={<User />} />
          <Route exact path="/admin/brand" element={<Brand />} />
          <Route exact path="/admin/category" element={<Category />} />
          <Route exact path="/admin/car" element={<Car />} />
          <Route exact path="/admin/sale" element={<Sale />} />
        </Routes>
      }
    </main>
  );
}

export default App;
