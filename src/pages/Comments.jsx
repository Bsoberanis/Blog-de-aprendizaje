import { useComments } from "../shared/hooks/useComments.jsx";

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
  } = useComments();

  const handleSearch = () => {
    fetchComments(searchTitle.trim());
  };

  const clearSearch = () => {
    setSearchTitle("");
    fetchComments();
  };

  return (
    <section className="max-w-7xl mx-auto px-8 py-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white font-sans rounded-lg shadow-lg">
      <h2 className="text-4xl font-extrabold text-center mb-12 text-cyan-400 tracking-wide drop-shadow-lg">
        Comentarios de Usuario
      </h2>

      {/* Buscador y filtros */}
      <div className="flex flex-col md:flex-row md:items-center gap-6 p-6 bg-gray-850 bg-opacity-30 border border-cyan-600 rounded-xl shadow-xl mb-12">
        <input
          type="text"
          placeholder="🔍 Buscar por título de publicación..."
          className="flex-1 px-5 py-3 bg-gray-800 border border-cyan-600 rounded-md text-white placeholder-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition shadow-inner"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          aria-label="Buscar comentarios por título"
        />
        <button
          onClick={clearSearch}
          className="px-5 py-3 bg-cyan-700 hover:bg-cyan-600 font-semibold rounded-md transition shadow-md border border-cyan-600"
          aria-label="Mostrar todos los comentarios"
        >
          Mostrar Todo
        </button>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-5 py-3 bg-gray-800 border border-cyan-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition shadow-inner"
          aria-label="Filtrar comentarios"
        >
          <option value=""> Filtrar (ninguno)</option>
          <option value="course"> Por Curso</option>
          <option value="date">Por Fecha</option>
          <option value="author"> Por Autor</option>
        </select>
      </div>

      {/* Mensajes de estado */}
      {error && (
        <div className="bg-red-900 border border-red-700 text-red-300 p-5 rounded-md mb-8 shadow-inner">
          {error}
        </div>
      )}

      {loading && !error && (
        <p className="text-cyan-400 text-center font-semibold tracking-wide animate-pulse">
          ⏳ Cargando comentarios...
        </p>
      )}

      {/* Lista de comentarios */}
      {!loading && comments.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2">
          {comments.map(({ _id, publication, author, comment, createdAt }) => (
            <article
              key={_id}
              className="bg-gray-800 border border-cyan-700 rounded-xl shadow-lg hover:shadow-cyan-500/70 transition p-7 flex flex-col"
              aria-label={`Comentario en ${publication?.title || "Sin título"}`}
            >
              <time
                className="text-sm text-cyan-300 mb-3"
                dateTime={new Date(createdAt).toISOString()}
              >
                {" "}
                {new Date(createdAt).toLocaleDateString("es-CL", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </time>

              <h3 className="text-xl font-bold text-cyan-400 mb-3 tracking-wide">
                {publication?.title || "Sin Título"}
              </h3>

              <p className="mb-1 text-gray-300">
                <strong> Curso:</strong>{" "}
                {publication?.course?.length
                  ? publication.course.map((c) => c.name).join(", ")
                  : "No especificado"}
              </p>

              <p className="mb-3 text-gray-300">
                <strong> Autor:</strong> {author}
              </p>

              <p className="text-gray-200 flex-grow leading-relaxed">
                <strong>Comentario:</strong> {comment}
              </p>
            </article>
          ))}
        </div>
      ) : (
        !loading &&
        !error && (
          <p className="text-center text-cyan-400 font-semibold tracking-wide">
            No se encontraron comentarios.
          </p>
        )
      )}
    </section>
  );
};

export default Comments;
