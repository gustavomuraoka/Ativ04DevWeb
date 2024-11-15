import { BrowserRouter, Route, Routes } from "react-router-dom";
import Produtos from "../pages/produtos";
import Main from "../pages/main";
import Forncedores from "../pages/fornecedores";
import Clientes from "../pages/clientes";

function MainRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />}/>
                <Route path="/Produtos" element={<Produtos />}/>
                <Route path="/Fornecedores" element={<Forncedores />}/>
                <Route path="/Clientes" element={<Clientes />}/>
            </Routes> 
        </BrowserRouter>
    )
}

export default MainRoutes