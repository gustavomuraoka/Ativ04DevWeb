import React, { useState, useEffect } from "react";
import './style.css';
import { useNavigate } from "react-router-dom";
import BarraSuperior from "../../components/BarraSuperior";
import axios from "axios";

interface Cliente {
  id: number;
  nome: string;
}

interface Produto {
  id: number;
  nome: string;
  preco: number;
  fornecedor: {
    nome: string;
  };
}

interface Venda {
  id: number;
  produto: Produto;
  cliente: Cliente;
  quantidade: number;
  total: number;
}

function Main() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [qntd, setQntd] = useState(0);
  const [selectedProduto, setSelectedProduto] = useState("");
  const [selectedCliente, setSelectedCliente] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const [produtosRes, clientesRes, vendasRes] = await Promise.all([
          axios.get("http://localhost:3001/api/produtos"),
          axios.get("http://localhost:3001/api/clientes"),
          axios.get("http://localhost:3001/api/venda"),
        ]);

        setProdutos(produtosRes.data);
        setClientes(clientesRes.data);
        setVendas(vendasRes.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }
    fetchData();
  }, []);

  const handleNavigation = (path: string) => {
    navigate(`/${path}`);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const produtoSelecionado = produtos.find((produto) => produto.id === Number(selectedProduto));
    if (!produtoSelecionado) {
      alert("Produto inválido selecionado.");
      return;
    }

    const preco = produtoSelecionado.preco;

    try {
      await axios.post("http://localhost:3001/api/venda", {
        produtoId: selectedProduto,
        clienteId: selectedCliente,
        quantidade: qntd,
        total: preco * qntd,
      });

      alert("Venda registrada com sucesso!");

      // Atualiza a lista de vendas
      const vendasRes = await axios.get("http://localhost:3001/api/venda");
      setVendas(vendasRes.data);
    } catch (error) {
      console.error("Erro ao registrar venda:", error);
      alert("Ocorreu um erro ao registrar a venda.");
    }
  };

  return (
    <main>
      <BarraSuperior />

      <div className="page-title">
        <div style={{ display: "flex", gap: "1rem" }}>
          <button onClick={() => handleNavigation("Produtos")} className="button-url">Produtos</button>
          <button onClick={() => handleNavigation("Fornecedores")} className="button-url">Fornecedores</button>
          <button onClick={() => handleNavigation("Clientes")} className="button-url">Clientes</button>
        </div>

        <h1 className="title">Registrar Venda</h1>
        <hr className="line" />
      </div>

      <form onSubmit={handleSubmit} className="form-formvendas">
        <div className="form-group-formvendas">
            Produto:
          <select
            id="produto"
            value={selectedProduto}
            onChange={(e) => setSelectedProduto(e.target.value)}
            required
            className="select-formvendas"
          >
            <option value="">Selecione um produto</option>
            {produtos.map((produto) => (
              <option key={produto.id} value={produto.id}>
                {produto.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group-formvendas">
          <label htmlFor="cliente" className="label-formvendas">
            Cliente:
          </label>
          <select
            id="cliente"
            value={selectedCliente}
            onChange={(e) => setSelectedCliente(e.target.value)}
            required
            className="select-formvendas"
          >
            <option value="">Selecione um cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group-formvendas">
          <label htmlFor="quantidade" className="label-formvendas">
            Quantidade:
          </label>
          <input
            type="number"
            id="quantidade"
            value={qntd}
            onChange={(e) => setQntd(Number(e.target.value))}
            required
            min="1"
            className="input-formvendas"
          />
        </div>

        <button type="submit" className="button-submit-formvendas">
          Registrar Venda
        </button>
      </form>


      <div style={{ margin: "2rem" }}>
        <h2>Vendas Registradas</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Cliente</th>
              <th>Fornecedor</th>
              <th>Quantidade</th>
              <th>Valor Total</th>
            </tr>
          </thead>
          <tbody>
            {vendas.map((venda) => (
              <tr key={venda.id} style={{borderBottom: "1px solid"}}>
                <td style={{borderBottom: "1px solid"}}>{venda.produto.nome}</td>
                <td style={{borderBottom: "1px solid"}}>{venda.cliente.nome}</td>
                <td style={{borderBottom: "1px solid"}}>{venda.produto.fornecedor.nome}</td>
                <td style={{borderBottom: "1px solid"}}>{venda.quantidade}</td>
                <td style={{borderBottom: "1px solid"}}>R$ {venda.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Main;
