import "./Home.module.css";
import { ButtonCards, ButtonLogout, ButtonModal } from "../../Components/ExportComponents.js";
import { getLoans, getRegister } from "../../services/api/request/allRequests.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserIdFromToken } from "../../services/api/axiosConfig.js";
import { getUserData } from "../../services/api/request/allRequests.js";
import { getBooks } from "../../services/api/request/allRequests.js";
import { SAVE_USEREMAIL_PATH } from "../../services/api/constants/index.js";
import { Link } from "react-router-dom";

export const HomeScreen = () => {
  const [booksData, setBooksData] = useState(null);
  const [loansData, setLoansData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeLoansCount, setActiveLoansCount] = useState(0);
  const [userName, setUserName] = useState("");

  // Function to navigate between pages
  const navigate = useNavigate();

  // Functions to open and close the modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const getUserName = async () => {
    try {
      const result = await getUserData();

      // Validate data structure
      if (!result?.userCopies || result.userCopies.length === 0) {
        console.warn("Nenhuma cópia encontrada para o usuário.");
        return "Usuário não encontrado";
      }

      const firstUserName =
        result.userCopies[0]?.userName || "Nome não disponível";
      setUserName(firstUserName);

      return firstUserName;
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
      return "Erro ao buscar o nome do usuário";
    }
  };

  // Load available books
  const loadBooksData = async () => {
    try {
      const result = await getBooks();
      setBooksData(result);
    } catch (error) {
      console.error("Erro ao carregar dados de livros:", error.message);
    }
  };

  // Load user's loans
  const loadLoansData = async () => {
    try {
      const userId = getUserIdFromToken(); // Get the logged-in user ID
      if (!userId) {
        console.error("Erro: Usuário não autenticado.");
        return;
      }

      const result = await getLoans(); // Retrieve all loans
      const userLoans = result.filter((loan) => loan.userId === userId); // Filter for the current user's loans
      setLoansData(userLoans);

      // Calculate the count of active loans
      setActiveLoansCount(userLoans.length);
    } catch (error) {
      console.error("Erro ao carregar dados de empréstimos:", error.message);
    }
  };

  // Access the Books route
  const onClickConsultarAcervo = () => {
    navigate("/Books");
  };

  // Access the MyBooks route
  const onClickConsultarLista = () => {
    navigate("/MyBooks");
  };

  const email = localStorage.getItem(SAVE_USEREMAIL_PATH);

  useEffect(() => {
    loadBooksData();
    loadLoansData();
    getUserName();
  }, []);

  return (
    <div className="home-screen-container">
      <div className="home-screen-navbar">
        <div className="navbar-content">
          <img
            className="navbar-image"
            src="/imagens/logo-racnege.png"
            alt="Logo Racnege"
          />
          <ButtonModal onClick={openModal}></ButtonModal>
          {isModalOpen && (
            <div className="modal-overlay">
              <div className="modal">
                <div className="button-align">
                  <button onClick={closeModal}>Fechar</button>
                </div>
                <h2>{userName}</h2>
                <p>{email}</p>
                <div className="modal-links">
                  <img className="modal-icons" src="/imagens/home.png" />
                  <Link className="link mt" to="/Home" onClick={closeModal}>
                    Home
                  </Link>
                </div>
                <div className="modal-links">
                  <img className="modal-icons" src="/imagens/myinfo.png" />
                  <Link className="link mt" to="/UpdateUser">
                    Minhas informações
                  </Link>
                </div>
                <div className="modal-links">
                  <img className="modal-icons" src="/imagens/livros.png" />
                  <Link className="link mt" to="/MyBooks">
                    Meus empréstimos
                  </Link>
                </div>
                <div className="modal-links">
                  <img className="modal-icons" src="/imagens/acervo.png" />
                  <Link className="link mt" to="/Books">
                    Acervo
                  </Link>
                </div>
                <ButtonLogout>SAIR</ButtonLogout>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="cards-products-grid">
        <div className="products-cards">
          <h2 className="cards-title">Categorias</h2>
          <div className="categorias-content">
            <p>Biografias</p>
            <div className="categorias-barras"></div>
          </div>
          <div className="categorias-content">
            <p>Cultura Africana</p>
            <div className="categorias-barras"></div>
          </div>
          <div className="categorias-content">
            <p>Cultura Popular</p>
            <div className="categorias-barras"></div>
          </div>
          <div className="categorias-content">
            <p>Educação/Pedagogia</p>
            <div className="categorias-barras"></div>
          </div>
          <div className="categorias-content">
            <p>Infantil</p>
            <div className="categorias-barras"></div>
          </div>
          <div className="categorias-content">
            <p>Literatura Brasileira</p>
            <div className="categorias-barras"></div>
          </div>
          <div className="categorias-content">
            <p>Questões de Gênero</p>
            <div className="categorias-barras"></div>
          </div>
          {/* Exemplo de uso dos dados de categorias vindos do backend
            {homeData?.categories?.map((category, index) => (
            <div key={index} className="categorias-content">
              <p>{category.name}</p>
              <div className="categorias-barras"></div>
            </div>
          ))} */}
        </div>
        <div className="products-cards">
          <h2 className="cards-title">Livros Disponíveis</h2>
          <div className="grafico-cards">
            <div className="quantity-cards">
              {booksData?.length || 0} Livros Disponíveis
            </div>
          </div>
          <ButtonCards onClick={onClickConsultarAcervo}>
            Consultar Acervo
          </ButtonCards>
        </div>
        <div className="products-cards">
          <h2 className="cards-title">Meus Empréstimos</h2>
          <div className="grafico-cards">
            <div className="quantity-cards">
              {activeLoansCount || 0} Empréstimos Ativos
            </div>
          </div>
          <ButtonCards onClick={onClickConsultarLista}>
            Consultar Lista
          </ButtonCards>
        </div>
      </div>
    </div>
  );
};
