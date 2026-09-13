import "./ButtonCards.module.css";

export const ButtonCards = ({ children, onClick }) => {
  return (
    <button className="button-cards" onClick={onClick}>
      {children}
    </button>
  );
};
