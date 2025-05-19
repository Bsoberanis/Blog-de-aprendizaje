import { Link, NavLink } from "react-router-dom";

const navLinks = [
  { path: "/publications", label: "📚 Ver Publicaciones" },
  { path: "/comments", label: "💬 Ver Comentarios" },
];

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg border-b-2 border-cyan-500">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo o nombre de la app */}
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-wider text-cyan-400 hover:text-cyan-300 transition duration-300"
        >
          🎮 GameBlog
        </Link>

        {/* Navegación */}
        <div className="flex gap-6">
          {navLinks.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `text-lg font-semibold px-4 py-2 rounded-md transition duration-300 ${
                  isActive
                    ? "bg-cyan-600 text-white shadow-md"
                    : "text-gray-300 hover:text-white hover:bg-gray-700"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
