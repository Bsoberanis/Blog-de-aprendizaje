// src/pages/Comments.jsx
import { useComments } from "../shared/hooks/useComments";
import "../Styles/Comments.css";

const Comments = () => {
  const {
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
  } = useComments();

  const handleSearch = () => {
    fetchComments(searchTitle.trim());
  };

  const clearSearch = () => {
    setSearchTitle("");
    fetchComments();
  };

  return (
    <section className="comments-section">
      <h2 className="comments-title">Comentarios de Usuario</h2>

      {/* Buscador y filtros */}
      <div className="comments-controls">
        <input
          type="text"
          placeholder="🔍 Buscar por título de publicación..."
          className="comments-input"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          aria-label="Buscar comentarios por título"
        />
        <button
          onClick={clearSearch}
          className="comments-button"
          aria-label="Mostrar todos los comentarios"
        >
          Mostrar Todo
        </button>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="comments-select"
          aria-label="Filtrar comentarios"
        >
          <option value=""> Filtrar (ninguno)</option>
          <option value="course"> Por Curso</option>
          <option value="date">Por Fecha</option>
          <option value="author"> Por Autor</option>
        </select>
      </div>

      {/* Formulario para nuevo comentario */}
      <div className="new-comment-form">
        <h3>Agregar Nuevo Comentario</h3>
        <input
          type="text"
          placeholder="Autor"
          value={newComment.author}
          onChange={(e) =>
            setNewComment({ ...newComment, author: e.target.value })
          }
        />
        <textarea
          placeholder="Comentario"
          value={newComment.comment}
          onChange={(e) =>
            setNewComment({ ...newComment, comment: e.target.value })
          }
        />
        <button onClick={handleCreate}>Publicar</button>
      </div>

      {/* Mensajes de estado */}
      {error && <div className="comments-error">{error}</div>}

      {loading && !error && (
        <p className="comments-loading">⏳ Cargando comentarios...</p>
      )}

      {/* Lista de comentarios */}
      {!loading && comments.length > 0 ? (
        <div className="comments-grid">
          {comments.map(({ _id, publication, author, comment, createdAt }) => (
            <article key={_id} className="comment-card">
              <time
                className="comment-date"
                dateTime={new Date(createdAt).toISOString()}
              >
                {new Date(createdAt).toLocaleDateString("es-CL", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </time>

              <h3 className="comment-title">
                {publication?.title || "Sin Título"}
              </h3>

              <p className="comment-detail">
                <strong>Curso:</strong>{" "}
                {publication?.course?.length
                  ? publication.course.map((c) => c.name).join(", ")
                  : "No especificado"}
              </p>

              <p className="comment-detail">
                <strong>Autor:</strong> {author}
              </p>

              {editingId === _id ? (
                <>
                  <textarea
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                  />
                  <button onClick={() => handleSave(_id)}>Guardar</button>
                </>
              ) : (
                <>
                  <p className="comment-text">
                    <strong>Comentario:</strong> {comment}
                  </p>
                  <button onClick={() => handleEdit(_id, comment)}>Editar</button>
                  <button onClick={() => handleDelete(_id)}>Eliminar</button>
                </>
              )}
            </article>
          ))}
        </div>
      ) : (
        !loading &&
        !error && (
          <p className="comments-empty">No se encontraron comentarios.</p>
        )
      )}
    </section>
  );
};

export default Comments;
