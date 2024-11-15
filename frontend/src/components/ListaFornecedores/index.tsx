import React from "react";

// Define the type of each product
interface Fornecedor {
  id: number;
  nome: string;
}

// Define the type for props
interface DataTableProps {
  data: Fornecedor[]; // Array of products
}

const ListFornecedores: React.FC<DataTableProps> = ({ data }) => {
  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
        </tr>
      </thead>
      <tbody>
        {data.map((produto) => (
          <tr key={produto.id}>
            <td style={{borderBottom: "1px solid"}}>{produto.id}</td>
            <td style={{borderBottom: "1px solid"}}>{produto.nome}</td>
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

export default ListFornecedores;