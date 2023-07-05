import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Carsforsale from "./components/Carsforsale/Carsforsale";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
axios.defaults.baseURL = "https://pf-back.fly.dev/";
import Detail from "./components/Detail/Detail";

import Home from "./components/home/Home";
function App() {
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
