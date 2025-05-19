import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:3000/Blog/v1",
  timeout: 5000,
});

export const postComment = async (data) => {
  try {
    const response = await apiClient.post("/comments/postComment", data);
    return response;
  } catch (error) {
    return {
      error: true,
      details: error,
    };
  }
};

export const getComments = async () => {
  try {
    const response = await apiClient.get("/comments/getComments");
    return response;
  } catch (error) {
    return {
      error: true,
      details: error,
    };
  }
};

export const getCommentByPublication = async (title) => {
  try {
    const response = await apiClient.get(`/comments/getCommentByPublication/${title}`);
    return response;
  } catch (error) {
    return {
      error: true,
      details: error,
    };
  }
};

export const getPublications = async () => {
  try {
    const response = await apiClient.get("/publications/getPublications");
    return response;
  } catch (error) {
    return {
      error: true,
      details: error,
    };
  }
};

export const getPublicationsByCourseName = async (name) => {
  try {
    const response = await apiClient.get(`/publications/getPublicationsByCourseName/${name}`);
    return response;
  } catch (error) {
    return {
      error: true,
      details: error,
    };
  }
};
