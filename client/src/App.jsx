import "./App.css";
import axios from "axios";
import {Routes,Route} from 'react-router-dom'
import Authentication from "./components/Authentication";
axios.defaults.url='http://localhost:3001/'

function App() {
  return <>
  
    <h1>CREANDO LA PAGINA</h1>
    <Authentication/>
    {
      //EJEMPLO PARA IMPLEMENTAR RUTAS
    }
    {/* <Routes>
        <Route path="/" element={<componente/>}></Route>
    </Routes> */}
  
  </>;
}

export default App;
