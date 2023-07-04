import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <main className="App">
      <Routes>
        <Route exact path="/" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </main>
  );
}

export default App;
