import React from "react";
import { createLoan } from "../../../services/api/request/loanRequests";
import { getUserIdFromToken } from "../../../services/api/axiosConfig";

const RentButtonRenderer = (props) => {
  const handleClick = async () => {
    if (props.data.available) {
      const userId = getUserIdFromToken(); // Retrieves the userId from the token

      if (!userId) {
        alert("Error: User not authenticated.");
        return;
      }

      try {
        // Loan data to be sent to the API
        const loanData = {
          bookId: props.data.id, // Book ID
          userId, // Logged-in user ID
          date: new Date().toISOString(), // Current date
        };

        // API call to create the loan
        await createLoan(loanData);
        alert(`Book "${props.data.title}" successfully rented!`);

        // Updates the grid by marking the book as unavailable
        props.api.applyTransaction({
          update: [{ ...props.data, available: false }],
        });
      } catch (error) {
        alert(
          "Error renting the book: " + error.response?.data?.message ||
            error.message
        );
      }
    }
  };

  return (
    <button
      style={{
        backgroundColor: props.data.available ? "#28a745" : "#6c757d",
        color: "white",
        border: "none",
        padding: "5px 10px",
        cursor: props.data.available ? "pointer" : "not-allowed",
      }}
      disabled={!props.data.available}
      onClick={handleClick}
    >
      {props.data.available ? "Rent" : "Unavailable"}
    </button>
  );
};

export default RentButtonRenderer;