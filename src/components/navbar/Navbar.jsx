import { Link, NavLink } from "react-router-dom";
import "../../Styles/Navbar.css";

const navLinks = [
  { path: "/publications", label: "📚 Ver Publicaciones" },
  { path: "/comments", label: "💬 Ver Comentarios" },
];

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🎮 GameBlog
        </Link>

        <div className="navbar-links">
          {navLinks.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
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
