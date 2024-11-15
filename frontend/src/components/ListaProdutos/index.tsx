import React from "react";

// Define the type of each product
interface Produto {
  id: number;
  nome: string;
  preco: number;
}

// Define the type for props
interface DataTableProps {
  data: Produto[]; // Array of products
}

const ListProdutos: React.FC<DataTableProps> = ({ data }) => {
  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Preço</th>
        </tr>
      </thead>
      <tbody>
        {data.map((produto) => (
          <tr key={produto.id}>
            <td style={{borderBottom:"1px solid"}}>{produto.id}</td>
            <td style={{borderBottom:"1px solid"}}>{produto.nome}</td>
            <td style={{borderBottom:"1px solid"}}>R$ {produto.preco}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Simple styling for the table
const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  margin: "20px 0",
  fontSize: "18px",
  textAlign: "left",
};

export default ListProdutos;