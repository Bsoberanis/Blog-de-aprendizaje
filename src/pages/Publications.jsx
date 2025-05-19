import { usePublications } from "../shared/hooks/usePublications.jsx";

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
    <section className="max-w-7xl mx-auto px-8 py-14 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white font-sans rounded-lg shadow-lg flex gap-10 min-h-[600px]">
      
      {/* Menú lateral */}
      <aside className="w-80 flex flex-col gap-6 bg-gray-850 bg-opacity-30 border border-cyan-600 rounded-xl p-6 shadow-xl sticky top-10 h-fit">
        <h2 className="text-3xl font-extrabold text-cyan-400 tracking-wide drop-shadow-lg text-center mb-6">
          🎮 Explora Publicaciones
        </h2>
        <input
          type="text"
          placeholder="🔍 Buscar por nombre del curso..."
          className="px-5 py-3 bg-gray-800 border border-cyan-600 rounded-md text-white placeholder-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition shadow-inner"
          value={searchCourse}
          onChange={(e) => setSearchCourse(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchPublications(searchCourse.trim())}
          aria-label="Buscar publicaciones por nombre de curso"
        />
        <button
          onClick={clearSearch}
          className="w-full px-5 py-3 bg-cyan-700 hover:bg-cyan-600 font-semibold rounded-md transition shadow-md border border-cyan-600"
          aria-label="Mostrar todas las publicaciones"
        >
          🔄 Mostrar Todo
        </button>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-5 py-3 bg-gray-800 border border-cyan-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition shadow-inner"
          aria-label="Filtrar publicaciones"
        >
          <option value="">🎯 Filtrar (ninguno)</option>
          <option value="course">📘 Por Curso</option>
          <option value="publicated">📅 Por Fecha</option>
        </select>

        {/* Mensajes de estado en menú */}
        {error && (
          <div className="bg-red-900 border border-red-700 text-red-300 p-4 rounded-md mt-4 shadow-inner">
            ⚠️ {error}
          </div>
        )}

        {loading && !error && (
          <p className="text-blue-400 font-semibold tracking-wide animate-pulse mt-4 text-center">
            ⏳ Cargando publicaciones...
          </p>
        )}

        {commentSuccess && (
          <div
            className="bg-green-700 border border-green-800 text-white p-4 rounded-md mt-4 shadow-lg text-center font-semibold"
            role="alert"
          >
            ✅ ¡Comentario enviado exitosamente!
          </div>
        )}
      </aside>

      {/* Contenido principal: listado + formulario */}
      <main className="flex-1 flex flex-col gap-10">
        {/* Lista publicaciones */}
        {!loading && publications.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 overflow-auto max-h-[450px]">
            {publications.map((pub) => (
              <button
                key={pub._id}
                type="button"
                onClick={() => setSelectedPublication(pub)}
                className={`bg-gray-800 border rounded-xl shadow-lg p-6 text-left cursor-pointer transition 
                  ${selectedPublication?._id === pub._id ? "border-cyan-400 shadow-cyan-500/70" : "border-cyan-700 hover:border-cyan-400 hover:shadow-cyan-500/50"}
                `}
                aria-label={`Seleccionar publicación ${pub.title}`}
              >
                <h3 className="text-xl font-bold text-cyan-400 mb-2 tracking-wide">{pub.title}</h3>
                <p className="text-gray-300 mb-3 leading-relaxed line-clamp-4">{pub.description}</p>
                <p className="text-gray-400 mb-1">
                  <strong>📘 Curso:</strong>{" "}
                  {pub.course?.length ? pub.course.map((c) => c.name).join(", ") : "No asignado"}
                </p>
                <p className="text-sm text-gray-500 mt-1">
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
            <p className="text-center text-cyan-400 font-semibold tracking-wide">
              ⚠️ No se encontraron publicaciones.
            </p>
          )
        )}

        {/* Formulario de comentario */}
        {selectedPublication && !commentSuccess && (
          <section
            className="bg-gray-800 p-8 rounded-xl shadow-lg border border-cyan-700 max-w-3xl mx-auto"
            aria-label={`Formulario para comentar en publicación ${selectedPublication.title}`}
          >
            <h4 className="text-2xl font-semibold text-cyan-400 mb-6 tracking-wide">
              💬 Añadir Comentario a: <span className="text-white">{selectedPublication.title}</span>
            </h4>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <input
                type="text"
                placeholder="👤 Tu nombre"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-5 py-3 bg-gray-700 border border-cyan-600 rounded-md text-white placeholder-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition shadow-inner"
                aria-label="Nombre del autor del comentario"
                required
              />
              <textarea
                placeholder="✍️ Escribe tu comentario..."
                rows={5}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-5 py-3 bg-gray-700 border border-cyan-600 rounded-md text-white placeholder-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition shadow-inner resize-none"
                aria-label="Texto del comentario"
                required
              />
              <button
                type="submit"
                className="self-start bg-cyan-600 hover:bg-cyan-700 text-white px-7 py-3 rounded-md font-semibold transition shadow-md"
                aria-label="Enviar comentario"
              >
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
