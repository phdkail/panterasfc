import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "/src/assets/logo.png";
import searchIcon from "/src/assets/search.png";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const pages = [
    { name: "Inicio", path: "/" },
    { name: "Nosotros", path: "/nosotros" },
    { name: "Miembros", path: "/miembros" },
    { name: "Jornadas", path: "/jornadas" },
    { name: "Estadísticas", path: "/estadisticas" },
    { name: "Contacto", path: "/contacto" }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const matchedPages = pages.filter((page) =>
      page.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    navigate("/search-results", { state: { results: matchedPages, query: searchQuery } });
    setSearchQuery("");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>

      <ul className="nav-links">
        {pages.map((page) => (
          <li key={page.path}>
            <Link to={page.path}>{page.name}</Link>
          </li>
        ))}

        <li className="search-bar">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">
              <img src={searchIcon} alt="Buscar" />
            </button>
          </form>
        </li>
      </ul>
    </nav>
  );
}
