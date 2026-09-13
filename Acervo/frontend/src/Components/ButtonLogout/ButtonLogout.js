import "./ButtonLogout.module.css";
import { logoutUser } from "../../services/api/request/userRequests.js";
import { useNavigate } from "react-router-dom";

export const ButtonLogout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      alert("Logout realizado com sucesso");
      navigate("/Login");
    } catch (error) {
      alert("Erro ao realizar logout:", error);
    }
  };

  return (
    <button className="button-logout" onClick={handleLogout}>
      {children}
    </button>
  );
};
