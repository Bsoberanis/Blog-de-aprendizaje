import { useEffect, useState } from "react";
import { getCommentByPublication } from "../../services/api";
export const useComments = () => {
  // Estados
  const [comments, setComments] = useState([]);
  const [originalComments, setOriginalComments] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para ordenar comentarios según el filtro aplicado
const sortComments = (items, criterion) => {
  return items.slice().sort((a, b) => {
    switch (criterion) {
      case "course":
        return (a.publication?.course?.[0]?.name || "").localeCompare(
          b.publication?.course?.[0]?.name || ""
        );
      case "date":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "author":
        return a.author.localeCompare(b.author);
      default:
        return 0;
    }
  });
};

  // Función para obtener los comentarios (todos o por título)
  const fetchComments = async (title = "") => {
    setLoading(true);
    setError(null);

    const res = title
      ? await getCommentByPublication(title)
      : await getcomments();

    const data = res?.data?.comments || [];

    if (res.error || data.length === 0) {
      setError(
        res.error
          ? "❌ Error al cargar los comentarios."
          : "⚠️ No se encontraron comentarios para esta publicación."
      );
      setComments([]);
      setOriginalComments([]);
    } else {
      setOriginalComments(data);
      setComments(filter ? sortComments(data, filter) : data);
    }

    setLoading(false);
  };

  // Reordena los comentarios cada vez que cambia el filtro
  useEffect(() => {
    setComments(filter ? sortComments(originalComments, filter) : originalComments);
  }, [filter, originalComments]);

  // Carga inicial de comentarios
  useEffect(() => {
    fetchComments();
  }, []);

  return {
    comments,
    loading,
    error,
    searchTitle,
    setSearchTitle,
    filter,
    setFilter,
    fetchComments,
  };
};
