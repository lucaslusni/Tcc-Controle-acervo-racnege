import "./Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/api/request/allRequests";
import { Button, Input, Link } from "../../Components/ExportComponents.js";

export const Login = () => {
  const [useremail, setUserEmail] = useState("");
  const [userpassword, setUserPassword] = useState("");

  const navigate = useNavigate();

  const validateFields = () => {
    if (!useremail || !userpassword) {
      alert("Por favor, preencha todos os campos.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(useremail)) {
      alert("E-mail inválido.");
      return false;
    }
    return true;
  };

  const onClickAcessar = async () => {
    if (!validateFields()) return;
    try {
      const data = await loginUser(useremail, userpassword); // Calls the Api to login

      const { access_token } = data;
      localStorage.setItem("access_token", access_token);
  
      navigate("/Home");
    } catch (error) {
      alert("Erro ao realizar login: " + error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="auth-content-container">
          <img
            className="logo"
            src="/imagens/logo-racnege.png"
            alt="logo Racnegê"
          />
          <h3 className="full-width text-left mt-larger">Bem vindo!</h3>
          <p className="mt-small text-left">
            Digite seu email abaixo para ter acesso à plataforma de reservas e
            empréstimos Racnegê.
          </p>
          <label className="mt-small text-left">E-mail</label>
          <Input
            onChange={(text) => setUserEmail(text)}
            value={useremail}
            placeholder="email@exemplo.com"
          />
          <label className="mt-small text-left">Senha</label>
          <input
            type="password"
            onChange={(e) => setUserPassword(e.target.value)}
            value={userpassword}
            placeholder="Senha"
          />
          <Button onClick={onClickAcessar}>Acessar</Button>
          <Link to="/Register">Não tem conta? Faça seu cadastro aqui.</Link>
        </div>
      </div>
    </div>
  );
};
