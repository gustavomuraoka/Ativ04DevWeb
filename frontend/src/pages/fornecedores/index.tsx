import React, { useState, useEffect, useRef } from "react"
import './style.css'
import { useLocation, useNavigate, useParams } from "react-router-dom"
import BarraSuperior from "../../components/BarraSuperior";
import axios from "axios";
import ListFornecedores from "../../components/ListaFornecedores";
import ListaFornecedores from "../../components/ListaFornecedores";
import Voltar from "../../components/Voltar";


function Forncedores() {

  // Use state para armazenar e alterar a página de exibição dos produtos
  const [fornecedorNome, setFornecedorNome] = useState("");
  const [dataFornecedores, setDataFornecedores] = useState([])

  const navigate = useNavigate();


  const fetchFornecedores = async () => {
    const response = await axios.get("http://localhost:3001/api/fornecedores");
    setDataFornecedores(response.data);
  }

// Chama a função para pegar todos os produtos do BD ao montar o componente
  useEffect(() => {
    fetchFornecedores()
  }, [])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/api/fornecedores", {
        nome: fornecedorNome,
      });
      alert(`Fornecedor criado com sucesso!`);
      setFornecedorNome("");
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
        <h1 className="title">Fornecedores</h1>
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
            value={fornecedorNome}
            onChange={(e) => setFornecedorNome(e.target.value)}
            required
            className="input-formvendas"
          />
        </div>
        
        <button type="submit" className="button-submit-formvendas">
          Enviar
        </button>
      </form>

    
      <hr className="line" />


      <ListaFornecedores data = {dataFornecedores}/>
    
    </main>
  )
}

export default Forncedores