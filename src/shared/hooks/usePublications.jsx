import { useEffect, useState } from "react";
import {
  getPublications,
  getPublicationsByCourseName,
  postComment,
} from "../../services/api";

export const usePublications = () => {
  // Estados para manejar publicaciones y comentarios
  const [publications, setPublications] = useState([]);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("");
  const [searchCourse, setSearchCourse] = useState("");
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentSuccess, setCommentSuccess] = useState(false);

  // Función para ordenar publicaciones según el filtro seleccionado
  const sortPublications = (items, criterion) => {
    switch (criterion) {
      case "course":
        return [...items].sort((a, b) =>
          (a.course?.[0]?.name || "").localeCompare(b.course?.[0]?.name || "")
        );
      case "publicated":
        return [...items].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      default:
        return items;
    }
  };

  // Función para obtener publicaciones, opcionalmente filtradas por curso
  const fetchPublications = async (query = "") => {
    setLoading(true);
    setError(null);
    setSelectedPublication(null);

    const res = query
      ? await getPublicationsByCourseName(query)
      : await getPublications();

    const data = res?.data?.publications || [];

    if (res.error || data.length === 0) {
      setError(
        res.error
          ? "❌ Error al cargar las publicaciones."
          : "⚠️ No se encontraron publicaciones para este curso."
      );
      setPublications([]);
    } else {
      setPublications(filter ? sortPublications(data, filter) : data);
    }

    setLoading(false);
  };

  // Función para enviar un comentario asociado a una publicación
  const handleCommentSubmit = async () => {
    if (!comment.trim() || !author.trim()) return;

    const res = await postComment({
      author,
      comment,
      publication: selectedPublication.title,
    });

    if (!res.error) {
      setAuthor("");
      setComment("");
      setCommentSuccess(true);
      fetchPublications(searchCourse);
      setTimeout(() => setCommentSuccess(false), 3000);
    }
  };

  // Efecto para cargar publicaciones al montar el componente
  useEffect(() => {
    fetchPublications();
  }, []);

  // Efecto para reordenar publicaciones cuando cambia el filtro
  useEffect(() => {
    setPublications((prev) => sortPublications(prev, filter));
  }, [filter]);

  return {
    publications,
    selectedPublication,
    setSelectedPublication,
    comment,
    setComment,
    author,
    setAuthor,
    handleCommentSubmit,
    searchCourse,
    setSearchCourse,
    fetchPublications,
    error,
    loading,
    commentSuccess,
    filter,
    setFilter,
  };
};
