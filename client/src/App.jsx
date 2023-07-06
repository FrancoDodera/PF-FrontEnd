import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Carsforsale from "./components/Carsforsale/Carsforsale";
import { Routes, Route,useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import CryptoJS from 'crypto-js';
axios.defaults.baseURL = "https://pf-back.fly.dev/";
import Detail from "./components/Detail/Detail";
import Home from "./components/home/Home";
function App() {
  const navigate=useNavigate();
  const validationLogin=async()=>{
    const localAuth={email:localStorage.getItem("user"),password:localStorage.getItem("auth")}
    if(!localAuth.email || !localAuth.password){
      navigate("/");
    }else{
      const bytesUser = CryptoJS.AES.decrypt(localAuth.email, 'secretKey');
      const bytesPassword = CryptoJS.AES.decrypt(localAuth.password, 'secretKey');
      const username = bytesUser.toString(CryptoJS.enc.Utf8);
      const password=bytesPassword.toString(CryptoJS.enc.Utf8);
      const credentials={
        email:username,
        password:password
      }
      const {data}=await axios.post('/user/addUser',credentials);
      if(data.acces){
        navigate("/home");
      }else{
        localStorage.clear();
        navigate("/");
      }
    }
  }
  useEffect(()=>{
    const validation=async()=>{
      await validationLogin();
    }
    validation();
  },[])
  return (
    <main className="App">
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/carsforsale" element={<Carsforsale />}/>
        <Route exact path="/detail/:id" element={<Detail />} />
      </Routes>
    </main>
  );
}

export default App;
