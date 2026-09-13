import "./UpdateUser.module.css";
import { useState, useEffect } from "react";
import { Input, Button, Link } from "../../Components/ExportComponents.js";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../services/api/request/allRequests";
import { api } from "../../services/api/axiosConfig.js";
import { getUserIdFromToken } from "../../services/api/axiosConfig";

export const UpdateUser = () => {
  const [username, setUserName] = useState("");
  const [useremail, setUserEmail] = useState("");
  const [usercpf, setUserCpf] = useState("");
  const [userphone, setUserPhone] = useState("");
  const [userpassword, setUserPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("access_token");
        if (!userId) {
          navigate("/Login");
          return;
        }

        const userData = await getUserData(); // Calls the api to get the user data
        if (userData) {
          setUserName(userData.name);
          setUserEmail(userData.email);
          setUserCpf(userData.cpf);
          setUserPhone(userData.phone);
          setUserPassword(userData.password);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        alert("Erro ao carregar os dados do usuário");
      }
    };

    fetchUserData();
  }, []);

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

  const onClickUpdate = async () => {
    if (!validateFields()) return;
    try {
      const userData = {
        name: username,
        email: useremail,
        cpf: usercpf,
        phone: userphone,
        password: userpassword,
      };

      const response = await api.put(
        `/users/${getUserIdFromToken()}`,
        userData
      );
      if (response.status === 200) {
        alert("Informações atualizadas com sucesso!");
        navigate("/Home"); // Redirects to home after sucess
      } else {
        throw new Error("Erro ao atualizar os dados.");
      }
    } catch (error) {
      alert("Erro ao atualizar as informações: " + error.message);
    }
  };

  return (
    <div className="auth-container-update">
      <div className="auth-content">
        <div className="auth-content-container">
          <img
            className="logo"
            src="/imagens/logo-racnege.png"
            alt="logo Racnegê"
          />
          <h3 className="full-width text-left mt-larger">
            Alterar Informações
          </h3>
          <p className="mt-small text-left">
            Atualize suas informações abaixo:
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
          <Button onClick={onClickUpdate}>Atualizar</Button>
          <Link to="/Home">Voltar para Home</Link>
        </div>
      </div>
    </div>
  );
};
