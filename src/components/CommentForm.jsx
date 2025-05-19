// src/components/CommentForm.jsx
import React, { useState } from 'react';

const CommentForm = ({ publicationId, onCommentSubmit }) => {
  const [author, setAuthor] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (author && comment) {
      onCommentSubmit({ author, comment, publicationId });
      setAuthor('');
      setComment('');
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <input
        type="text"
        placeholder="Tu nombre"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <textarea
        placeholder="Escribe tu comentario..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />
      <button type="submit">Enviar Comentario</button>
    </form>
  );
};

export default CommentForm;
