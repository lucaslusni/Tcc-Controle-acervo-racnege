import { api } from "../axiosConfig";

export const getLoans = async () => {
  const response = await api.get('/loans/');
  return response.data;
};

export const createLoan = async (loanData) => {
  const response = await api.post('/loans/create', loanData);
  return response.data;
};

export const postponeLoan = async (loanData) => {
  const response = await api.put('/loans/postpone', {id:loanData});
  return response.data;
};

export const returnLoan = async (loanData) => {
  const response = await api.put('/loans/return', loanData);
  return response.data;
};

export const terminateLoan = async (loanData) => {
  const response = await api.put('/loans/terminate', loanData);
  return response.data;
};
