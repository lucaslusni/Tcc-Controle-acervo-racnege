import "./MyBooks.module.css";
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import PostponeButtonRenderer from "./renderers/PostponeButtonRenderer.js";
import { getLoans } from "../../services/api/request/loanRequests.js";
import { ButtonLogout, ButtonModal } from "../../Components/ExportComponents.js";
import { getUserIdFromToken } from "../../services/api/axiosConfig.js";
import { SAVE_USEREMAIL_PATH } from "../../services/api/constants/index.js";
import { Link } from "react-router-dom";
import { getUserData } from "../../services/api/request/allRequests.js";

export const MyBooks = () => {
  const [rowData, setRowData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState("");

  // Functions to open and close the modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const getUserName = async () => {
    try {
      const result = await getUserData();

      // Validates the data structure
      if (!result?.userCopies || result.userCopies.length === 0) {
        console.warn("Nenhuma cópia encontrada para o usuário.");
        return "Usuário não encontrado";
      }

      // Gets the User Name
      const firstUserName =
        result.userCopies[0]?.userName || "Nome não disponível";
      setUserName(firstUserName);

      return firstUserName;
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
      return "Erro ao buscar o nome do usuário";
    }
  };

  // Obtains books lending list when the page loads
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const userId = getUserIdFromToken(); // Obtains User ID
        if (!userId) {
          alert("Erro: Usuário não autenticado.");
          return;
        }

        const loans = await getLoans(); // Calls the Api to get the books lending list
        // Filters the book lendings to the current user and converts the data
        const userLoans = loans
          .filter((loan) => loan.userId === userId)
          .map((loan) => ({
            id: loan.id,
            bookTitle: loan.bookTitle,
            ISBN: loan.ISBN,
            loanDate: new Date(loan.loanDate).toLocaleDateString(),
            expirationDate: new Date(loan.expirationDate).toLocaleDateString(),
            postponed: loan.postponed,
          }));

        setRowData(userLoans); // Updates the state with the converted data
      } catch (error) {
        alert("Erro ao carregar os empréstimos: " + error.message);
      }
    };
    fetchLoans();
    getUserName();
  }, []);

  const columnDefs = [
    {
      headerName: "Título do Livro",
      field: "bookTitle",
      filter: "agTextColumnFilter",
      flex: 1,
    },
    { headerName: "ISBN", field: "ISBN", filter: "agTextColumnFilter" },
    {
      headerName: "Data do Empréstimo",
      field: "loanDate",
      filter: "agDateColumnFilter",
      flex: 1,
    },
    {
      headerName: "Data de Expiração",
      field: "expirationDate",
      filter: "agDateColumnFilter",
      flex: 1,
    },
    {
      headerName: "Ação",
      field: "actions",
      cellRenderer: PostponeButtonRenderer, // Uses a component to render the button
      cellClass: "action-button-container",
      flex: 1,
    },
  ];

  const email = localStorage.getItem(SAVE_USEREMAIL_PATH);

  return (
    <div className="books-screen-container">
      <div className="books-screen-navbar">
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
                  <Link className="link mt" to="/MyBooks" onClick={closeModal}>
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
          domLayout="autoHeight"
          getRowHeight={() => 50}
          animateRows={true}
          defaultColDef={{
            resizable: true,
            sortable: true,
          }}
        />
      </div>
    </div>
  );
};
