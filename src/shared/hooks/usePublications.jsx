import { useEffect, useState } from "react";
import {
  getPublications,
  getPublicationsByCourseName,
  createComment,  // Aquí el cambio
} from "../../services/api";

export const usePublications = () => {
  const [publications, setPublications] = useState([]);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("");
  const [searchCourse, setSearchCourse] = useState("");
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentSuccess, setCommentSuccess] = useState(false);

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

  const fetchPublications = async (query = "") => {
    setLoading(true);
    setError(null);
    setSelectedPublication(null);

    let res;
    try {
      res = query
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
    } catch (err) {
      console.error("Error fetching publications:", err);
      setError("❌ Error al conectar con el servidor.");
      setPublications([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim() || !author.trim()) return;

    const res = await createComment({
      author,
      comment,
      publication: selectedPublication?.title,
    });

    if (!res.error) {
      setAuthor("");
      setComment("");
      setCommentSuccess(true);
      fetchPublications(searchCourse);
      setTimeout(() => setCommentSuccess(false), 3000);
    }
  };

  useEffect(() => {
    fetchPublications();
  }, []);

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
