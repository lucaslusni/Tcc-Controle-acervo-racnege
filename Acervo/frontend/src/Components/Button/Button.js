import "./Button.module.css";

export const Button = ({ children, onClick }) => {
  return (
    <button className="button-login-register" onClick={onClick}>
      {children}
    </button>
  );
};
