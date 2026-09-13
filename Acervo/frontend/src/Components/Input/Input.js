import "./Input.module.css";

export const Input = ({ value, placeholder, onChange }) => {
  return (
    <input
      onChange={(e) => onChange(e.target.value)}
      value={value}
      placeholder={placeholder}
    />
  );
};
