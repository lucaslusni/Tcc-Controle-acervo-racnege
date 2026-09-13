import "./Register.module.css";
import { useState } from "react";
import { Input, Button, Link } from "../../Components/ExportComponents.js";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import { registerUser } from "../../services/api/request/allRequests";

export const Register = () => {
  const [username, setUserName] = useState("");
  const [useremail, setUserEmail] = useState("");
  const [usercpf, setUserCpf] = useState("");
  const [userphone, setUserPhone] = useState("");
  const [userpassword, setUserPassword] = useState("");

  const navigate = useNavigate();

  const validateFields = () => {
    if (!username || !useremail || !usercpf || !userphone || !userpassword) {
      alert("Por favor, preencha todos os campos.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(useremail)) {
      alert("E-mail inválido.");
      return false;
    }
    if (usercpf.length !== 11) {
      alert("CPF inválido.");
      return false;
    }
    if (userphone.length < 10) {
      alert("Número de telefone inválido.");
      return false;
    }
    return true;
  };

  const onClickAcessar = async () => {
    if (!validateFields()) return;
    try {
      const userData = {
        name: username,
        email: useremail,
        cpf: usercpf,
        phone: userphone,
        password: userpassword,
      };
      const data = await registerUser(userData); // Calls the api to register

      const { access_token } = data;
      localStorage.setItem("access_token", access_token);

      navigate("/Home");
    } catch (error) {
      alert("Erro ao realizar registro: " + error.message);
    }
  };

  return (
    <div className="auth-container-register">
      <div className="auth-content">
        <div className="auth-content-container">
          <img
            className="logo"
            src="/imagens/logo-racnege.png"
            alt="logo Racnegê"
          />
          <h3 className="full-width text-left mt-larger">Novo Cadastro</h3>
          <p className="mt-small text-left">
            Insira seu nome, email e sua senha para ter acesso à plataforma de
            reservas e empréstimos Racnegê.
          </p>
          <label className="mt-small text-left">Nome</label>
          <Input
            onChange={(text) => setUserName(text)}
            value={username}
            placeholder="Ex: José da Silva"
          />
          <label className="mt-smaller text-left">E-mail</label>
          <Input
            onChange={(text) => setUserEmail(text)}
            value={useremail}
            placeholder="email@exemplo.com"
          />
          <label className="mt-small text-left">CPF</label>
          <Input
            onChange={(text) => setUserCpf(text)}
            value={usercpf}
            placeholder="000.000.000-00"
          />
          <label className="mt-small text-left">Celular</label>
          <Input
            onChange={(text) => setUserPhone(text)}
            value={userphone}
            placeholder="(99) 99999-9999"
          />

          <label className="mt-smaller text-left">Senha</label>
          <input
            type="password"
            onChange={(e) => setUserPassword(e.target.value)}
            value={userpassword}
            placeholder="Senha"
          />
          <Button onClick={onClickAcessar}>Acessar</Button>
          <Link to="/Login">Já possui uma conta? Faça seu login.</Link>
        </div>
      </div>
    </div>
  );
};
