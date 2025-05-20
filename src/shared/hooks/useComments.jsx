// src/shared/hooks/useComments.jsx
import { useEffect, useState } from "react";
import {
  getCommentByPublication,
  getComments,
  deleteComment,
  updateComment,
  createComment,
} from "../../services/api";


export const useComments = () => {
  const [comments, setComments] = useState([]);
  const [originalComments, setOriginalComments] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [newComment, setNewComment] = useState({ author: "", comment: "" });

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

  const fetchComments = async (title = "") => {
    setLoading(true);
    setError(null);

    try {
      const res = title
        ? await getCommentByPublication(title)
        : await getComments();

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
    } catch (err) {
      console.error("Error fetching comments:", err);
      setError("❌ Error al cargar los comentarios.");
      setComments([]);
      setOriginalComments([]);
    }

    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await deleteComment(id);
      fetchComments();
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  const handleEdit = (id, currentText) => {
    setEditingId(id);
    setEditedText(currentText);
  };

  const handleSave = async (id) => {
    try {
      await updateComment(id, editedText);
      setEditingId(null);
      setEditedText("");
      fetchComments();
    } catch (err) {
      console.error("Error updating comment:", err);
    }
  };

  const handleCreate = async () => {
    try {
      await createComment(newComment);
      setNewComment({ author: "", comment: "" });
      fetchComments();
    } catch (err) {
      console.error("Error creating comment:", err);
    }
  };

  useEffect(() => {
    setComments(filter ? sortComments(originalComments, filter) : originalComments);
  }, [filter, originalComments]);

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
    editingId,
    editedText,
    setEditedText,
    handleEdit,
    handleSave,
    handleDelete,
    newComment,
    setNewComment,
    handleCreate,
  };
};
