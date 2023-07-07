import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Carsforsale from "./components/Carsforsale/Carsforsale";
import { Routes, Route,useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
axios.defaults.baseURL = "https://pf-back.fly.dev/";
import Detail from "./components/Detail/Detail";
import Home from "./components/home/Home";
function App() {
  const navigate=useNavigate();
  const validationLogin=async()=>{
    const localAuth=localStorage.getItem("user");
    const localGuest=localStorage.getItem("guest");
    if(!localAuth){
      if(!localGuest){
        navigate('/')
      }else{
        navigate("/home");
      }
    }else{
      const {data}=await axios.post('/user/verifyUser',{user:localAuth});
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
