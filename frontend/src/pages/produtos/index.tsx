import React, { useState, useEffect, useRef } from "react"
import './style.css'
import { useLocation, useNavigate, useParams } from "react-router-dom"
import BarraSuperior from "../../components/BarraSuperior";
import axios from "axios";
import ListaProdutos from "../../components/ListaProdutos";
import Voltar from "../../components/Voltar";


function Produtos() {

  // Use state para armazenar e alterar a página de exibição dos produtos
  const [produtoNome, setProdutoNome] = useState("");
  const [produtoPreco, setProdutoPreco] = useState("");
  const [fornID, setFornID] = useState("");
  const [dataProdutos, setDataProdutos] = useState([])

  const navigate = useNavigate();

  // Função para buscar todos os produtos
  const fetchProdutos = async () => {
    const response = await axios.get("http://localhost:3001/api/produtos");
    setDataProdutos(response.data);
  }

// Chama a função para pegar todos os produtos do BD ao montar o componente
  useEffect(() => {
    fetchProdutos()
  }, [])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/api/produtos", {
        nome: produtoNome,
        preco: parseFloat(produtoPreco),
        fornecedorId : fornID,
      });
      alert(`Produto criado com sucesso!`);
      setProdutoNome("");
      setProdutoPreco("");
      setFornID("");
    } catch (error) {
      console.error("Erro ao salvar o produto:", error);
      alert("Ocorreu um erro ao salvar o produto.");
    }
  };

  return (
    <main>
        <BarraSuperior/>
      <div className="page-title">
        <Voltar/>
        <h1 className="title">Produtos</h1>
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
            value={produtoNome}
            onChange={(e) => setProdutoNome(e.target.value)}
            required
            className="input-formvendas"
          />
        </div>

        <div className="form-group-formvendas">
          <label htmlFor="preco" className="label-formvendas">
            Preço:
          </label>
          <input
            type="number"
            id="preco"
            value={produtoPreco}
            onChange={(e) => setProdutoPreco(e.target.value)}
            required
            min="0"
            step="0.01"
            className="input-formvendas"
          />
        </div>

        <div className="form-group-formvendas">
          <label htmlFor="fornID" className="label-formvendas">
            ID do Fornecedor:
          </label>
          <input
            type="number"
            id="fornID"
            value={fornID}
            onChange={(e) => setFornID(e.target.value)}
            required
            min="0"
            className="input-formvendas"
          />
        </div>

        <button type="submit" className="button-submit-formvendas">
          Enviar
        </button>
      </form>

    
      <hr className="line" />

      <ListaProdutos data = {dataProdutos}/>
    
    </main>
  )
}

export default Produtos