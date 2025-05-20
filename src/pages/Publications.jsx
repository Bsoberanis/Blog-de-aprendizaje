import { usePublications } from "../shared/hooks/usePublications.jsx";
import "../Styles/Publications.css";

const Publications = () => {
  const {
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
  } = usePublications();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommentSubmit();
  };

  const clearSearch = () => {
    setSearchCourse("");
    fetchPublications();
  };

  return (
    <section className="publications-container">
      <aside className="publications-sidebar">
        <h2>🎮 Explora Publicaciones</h2>
        <input
          type="text"
          placeholder="🔍 Buscar por nombre del curso..."
          value={searchCourse}
          onChange={(e) => setSearchCourse(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && fetchPublications(searchCourse.trim())
          }
          aria-label="Buscar publicaciones por nombre de curso"
        />
        <button onClick={clearSearch} aria-label="Mostrar todas las publicaciones">
          🔄 Mostrar Todo
        </button>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          aria-label="Filtrar publicaciones"
        >
          <option value="">🎯 Filtrar (ninguno)</option>
          <option value="course">📘 Por Curso</option>
          <option value="publicated">📅 Por Fecha</option>
        </select>

        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        {loading && !error && (
          <p className="loading-message">
            ⏳ Cargando publicaciones...
          </p>
        )}

        {commentSuccess && (
          <div className="success-message" role="alert">
            ✅ ¡Comentario enviado exitosamente!
          </div>
        )}
      </aside>

      <main className="publications-main">
        {!loading && publications.length > 0 ? (
          <div className="publications-list">
            {publications.map((pub) => (
              <button
                key={pub._id}
                type="button"
                onClick={() => setSelectedPublication(pub)}
                className={`publication-item ${
                  selectedPublication?._id === pub._id ? "selected" : ""
                }`}
                aria-label={`Seleccionar publicación ${pub.title}`}
              >
                <h3>{pub.title}</h3>
                <p>{pub.description}</p>
                <p>
                  <strong>📘 Curso:</strong>{" "}
                  {pub.course?.length
                    ? pub.course.map((c) => c.name).join(", ")
                    : "No asignado"}
                </p>
                <p>
                  <strong>📅 Creada:</strong>{" "}
                  {new Date(pub.createdAt).toLocaleDateString("es-CL", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </button>
            ))}
          </div>
        ) : (
          !loading &&
          !error && (
            <p className="no-results-message">
              ⚠️ No se encontraron publicaciones.
            </p>
          )
        )}

        {selectedPublication && !commentSuccess && (
          <section
            className="comment-form-section"
            aria-label={`Formulario para comentar en publicación ${selectedPublication.title}`}
          >
            <h4>
              💬 Añadir Comentario a: <span>{selectedPublication.title}</span>
            </h4>
            <form onSubmit={handleSubmit} className="comment-form">
              <input
                type="text"
                placeholder="👤 Tu nombre"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                aria-label="Nombre del autor del comentario"
                required
              />
              <textarea
                placeholder="📝 Escribe tu comentario..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                aria-label="Texto del comentario"
                required
              />
              <button type="submit" aria-label="Enviar comentario">
                🚀 Enviar Comentario
              </button>
            </form>
          </section>
        )}
      </main>
    </section>
  );
};

export default Publications;
