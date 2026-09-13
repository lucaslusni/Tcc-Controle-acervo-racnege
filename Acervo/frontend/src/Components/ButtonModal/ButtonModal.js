import "./ButtonModal.module.css";

export const ButtonModal = ({ children, onClick }) => {
  return (
    <button className="button-modal" onClick={onClick}>
      {children}
      <div className="button-modal-content"></div>
      <div className="button-modal-content"></div>
      <div className="button-modal-content"></div>
    </button>
  );
};
