import React from "react";
import { postponeLoan } from "../../../services/api/request/loanRequests";
import { getUserIdFromToken } from "../../../services/api/axiosConfig";

const PostponeButtonRenderer = (props) => {
  const handleClick = async () => {
    const userId = getUserIdFromToken(); // Gets the User ID

    if (!userId) {
      alert("Erro: Usuário não autenticado.");
      return;
    }

    console.log(props.data)
      try {
        // Calls the api to postpone Loan
        await postponeLoan(props.data.id);

        alert(
          `O empréstimo do livro "${props.data.bookTitle}" foi adiado com sucesso!`
        );

        // Updates the table to reflect the change
        props.api.applyTransaction({
          update: [{ ...props.data, postponed: true }],
        });

        window.location.reload();
      } catch (error) {
        alert(
          "Erro ao adiar o empréstimo: " +
            (error.response?.data?.message || error.message)
        );
      }
  };

  return (
    <button
      style={{
        backgroundColor: !props.data.postponed ? "#007bff" : "#6c757d",
        color: "white",
        border: "none",
        padding: "5px 10px",
        cursor: !props.data.postponed ? "pointer" : "not-allowed",
      }}
      onClick={handleClick}
    >
      {props.data.postponed ? "Adiado" : "Prorrogar"}
    </button>
  );
};

export default PostponeButtonRenderer;
