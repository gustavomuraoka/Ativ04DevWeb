import React from "react";
import { useNavigate } from "react-router-dom";

const Voltar: React.FC = () => {
  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate("/"); // Redirects to localhost:3000/
  };

  return (
    <p
      onClick={handleVoltar}
      style={styles}
    >
      &lt;- Voltar
    </p>
  );
};

const styles: React.CSSProperties = {
  cursor: "pointer",
  color: "black",
  textDecoration: "underline",
  fontSize: "16px",
  fontWeight: "bold",
  margin: "10px 0",
};

export default Voltar;
