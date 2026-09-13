import "./Books.module.css";
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import CoverRenderer from "./renderers/CoverRenderer.js";
import RentButtonRenderer from "./renderers/RentButtonRenderer.js";
import { getBooksAndDetails } from "../../services/api/request/bookRequests.js";
import { ButtonLogout, ButtonModal } from "../../Components/ExportComponents.js";
import { Link } from "react-router-dom";
import { SAVE_USEREMAIL_PATH } from "../../services/api/constants/index.js";
import { getUserData } from "../../services/api/request/allRequests.js";

export const Books = () => {
  const [rowData, setRowData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState("");

  // Funções para abrir e fechar o modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const getUserName = async () => {
    try {
      const result = await getUserData();

      // Validação da estrutura de dados
      if (!result?.userCopies || result.userCopies.length === 0) {
        console.warn("Nenhuma cópia encontrada para o usuário.");
        return "Usuário não encontrado";
      }

      // Obtém o nome do primeiro usuário
      const firstUserName =
        result.userCopies[0]?.userName || "Nome não disponível";
      setUserName(firstUserName);

      return firstUserName;
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
      return "Erro ao buscar o nome do usuário";
    }
  };

  // Obtém os livros ao carregar a página
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const books = await getBooksAndDetails(); // Chamada de API para obter os livros
        // Atualiza o campo "imageUrl" para incluir o host
        const updatedBooks = books.map((book) => ({
          ...book,
          imageUrl: `http://localhost:8081${book.imageUrl}`,
          available: book.copiesAvailable > 0, // Disponível se houver cópias
        }));
        setRowData(updatedBooks); // Atualiza o estado com os dados transformados
      } catch (error) {
        alert("Erro ao carregar os livros: " + error.message);
      }
    };
    fetchBooks();
    getUserName();
  }, []);

  const columnDefs = [
    {
      headerName: "Foto",
      field: "imageUrl",
      cellRenderer: CoverRenderer, // Usa o componente React para renderizar as fotos
      headerClass: "header-product",
      minWidth: 150,
      flex: 1,
    },
    { headerName: "Titulo", field: "title", filter: "agTextColumnFilter" },
    { headerName: "Autor", field: "author", filter: "agTextColumnFilter" },
    {
      headerName: "Categoria",
      field: "categoryName",
      filter: "agTextColumnFilter",
      flex: 1,
    },
    {
      headerName: "Disponibilidade",
      field: "copiesAvailable",
      filter: "agSetColumnFilter",
      flex: 1,
    },
    {
      headerName: "Alugar",
      field: "actions",
      cellRenderer: RentButtonRenderer, // Usa o componente React para os botões
      flex: 1,
    },
  ];

  const email = localStorage.getItem(SAVE_USEREMAIL_PATH);

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
                  <Link className="link mt" to="/Home">
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
                  <Link className="link mt" to="/Books" onClick={closeModal}>
                    Acervo
                  </Link>
                </div>
                <ButtonLogout>SAIR</ButtonLogout>
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        className="ag-theme-quartz"
        style={{
          height: "100vh",
          width: "100%",
          margin: 0,
        }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          getRowId={(params) => params.data.id}
          getRowHeight={(params) => {
            const imageHeight = 150;
            return imageHeight;
          }}
          domLayout="autoHeight" // Ajusta automaticamente a altura
          animateRows={true} // Animação ao atualizar
          defaultColDef={{
            resizable: true, // Colunas redimensionáveis
            sortable: true, // Habilita a ordenação
            filter: true, // Habilita o filtro
          }}
        />
      </div>
    </div>
  );
};
