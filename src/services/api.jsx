import axios from "axios";

// Cliente Axios configurado con baseURL del backend
const apiClient = axios.create({
  baseURL: "http://127.0.0.1:3000/blog/v1", // Cambia si usas otro puerto/backend
  timeout: 5000,
});

// 🔽 PUBLICACIONES 🔽

// Obtener todas las publicaciones
export const getPublications = async () => {
  try {
    const response = await apiClient.get("/publications/getPublications");
    return response.data;
  } catch (error) {
    return { error: true, details: error.response?.data || error.message };
  }
};

// Obtener publicaciones por nombre del curso
export const getPublicationsByCourseName = async (name) => {
  try {
    const response = await apiClient.get(`/publications/getPublicationsByCourseName/${name}`);
    return response.data;
  } catch (error) {
    return { error: true, details: error.response?.data || error.message };
  }
};

// 🔽 COMENTARIOS 🔽

// Crear un comentario
export const createComment = async (data) => {
  try {
    const response = await apiClient.post("/comments/postComment", data);
    return response.data;
  } catch (error) {
    return { error: true, details: error.response?.data || error.message };
  }
};

// Obtener todos los comentarios
export const getComments = async () => {
  try {
    const response = await apiClient.get("/comments/getComments");
    return response.data;
  } catch (error) {
    return { error: true, details: error.response?.data || error.message };
  }
};

// Obtener comentarios por título de publicación
export const getCommentByPublication = async (title) => {
  try {
    const response = await apiClient.get(`/comments/getCommentByPublication/${title}`);
    return response.data;
  } catch (error) {
    return { error: true, details: error.response?.data || error.message };
  }
};

// Obtener comentario por ID
export const getCommentById = async (id) => {
  try {
    const response = await apiClient.get(`/comments/getCommentById/${id}`);
    return response.data;
  } catch (error) {
    return { error: true, details: error.response?.data || error.message };
  }
};

// Actualizar comentario por ID
export const updateComment = async (id, data) => {
  try {
    const response = await apiClient.put(`/comments/putComment/${id}`, { comment: data });
    return response.data;
  } catch (error) {
    return { error: true, details: error.response?.data || error.message };
  }
};

// Eliminar comentario por ID
export const deleteComment = async (id) => {
  try {
    const response = await apiClient.delete(`/comments/deleteComment/${id}`);
    return response.data;
  } catch (error) {
    return { error: true, details: error.response?.data || error.message };
  }
};
