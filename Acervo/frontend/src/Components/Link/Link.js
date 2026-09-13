import "./Link.module.css";
import { useNavigate } from "react-router-dom";

export const Link = ({ to, children }) => {
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    navigate(to); 
  };

  return (
    <a className="mt-large" href={to} onClick={handleClick}>
      {children}
    </a>
  );
};
