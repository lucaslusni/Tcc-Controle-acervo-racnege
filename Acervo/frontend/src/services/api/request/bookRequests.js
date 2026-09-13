import { api } from "../axiosConfig";

export const getBooks = async () => {
  const response = await api.get('/books/');
  return response.data;
};

export const getBookDetails = async (bookId) => {
  const response = await api.get(`/books/view/${bookId}`);
  return response.data;
};

export const getBooksAndDetails = async () => {
  try {
    const booksResponse = await api.get('/books/');
    
    const booksWithDetails = await Promise.all(
      booksResponse.data.map(async (book) => {
        const detailsResponse = await api.get(`/books/view/${book.id}`);
        return {
          ...book,
          ...detailsResponse.data,
          copiesAvailable: detailsResponse.data.copiesAvailable,
          categoryName: detailsResponse.data.category?.name,
        };
      })
    );

    return booksWithDetails;
  } catch (error) {
    console.error("Error fetching books and details:", error);
    throw error;
  }
};



