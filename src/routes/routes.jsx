import { Route,Routes } from "react-router-dom";
import { Login } from "../components/LocalStorage";
import { DatosApi } from "../components/Datos";

export function RoutesNavLinks() {
    return (
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/datos" element={<DatosApi/>}/>
   

      </Routes>
    )
  }