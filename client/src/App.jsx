import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Carsforsale from "./components/Carsforsale/Carsforsale";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
axios.defaults.url = "http://localhost:3001/";

import Home from "./components/home/Home";
function App() {
  return (
    <main className="App">
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/carsforsale" element={<Carsforsale />} />
      </Routes>
    </main>
  );
}

export default App;
