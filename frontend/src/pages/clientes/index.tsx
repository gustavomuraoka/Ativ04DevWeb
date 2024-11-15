import React, { useState, useEffect, useRef } from "react"
import './style.css'
import { useLocation, useNavigate, useParams } from "react-router-dom"
import BarraSuperior from "../../components/BarraSuperior";
import axios from "axios";
import ListFornecedores from "../../components/ListaFornecedores";
import ListaFornecedores from "../../components/ListaFornecedores";
import Voltar from "../../components/Voltar";


function Clientes() {

  // Use state para armazenar e alterar a página de exibição dos produtos
  const [clienteNome, setClienteNome] = useState("");
  const [dataClientes, setDataClientes] = useState([])

  const navigate = useNavigate();


  const fetchClientes = async () => {
    const response = await axios.get("http://localhost:3001/api/clientes");
    setDataClientes(response.data);
  }

// Chama a função para pegar todos os produtos do BD ao montar o componente
  useEffect(() => {
    fetchClientes()
  }, [])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/api/clientes", {
        nome: clienteNome,
      });
      alert(`Cliente criado com sucesso!`);
      setClienteNome("");
    } catch (error) {
      console.error("Erro ao salvar o fornecedor:", error);
      alert("Ocorreu um erro ao salvar o fornecedor.");
    }
  };

  return (
    <main>
        <BarraSuperior/>
      <div className="page-title">
        <Voltar/>
        <h1 className="title">Clientes</h1>
        <hr className="line" />
      </div>

      <form onSubmit={handleSubmit} className="form-formvendas">
        <div className="form-group-formvendas">
          <label htmlFor="nome" className="label-formvendas">
            Nome:
          </label>
          <input
            type="text"
            id="nome"
            value={clienteNome}
            onChange={(e) => setClienteNome(e.target.value)}
            required
            className="input-formvendas"
          />
        </div>
        
        <button type="submit" className="button-submit-formvendas">
          Enviar
        </button>
      </form>

    
      <hr className="line" />


      <ListaFornecedores data = {dataClientes}/>
    
    </main>
  )
}

export default Clientes