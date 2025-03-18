import { Link, useLocation } from "react-router-dom";

export default function SearchResults() {
  const location = useLocation();
  const { results, query } = location.state || { results: [], query: "" };

  return (
    <div className="search-results-container">
      <h1>Resultados de búsqueda</h1>
      <p>Mostrando resultados para: <strong>{query}</strong></p>

      {results.length > 0 ? (
        <ul className="results-list">
          {results.map((page, index) => (
            <li key={index}>
              <Link to={page.path}>{page.name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron resultados para "{query}".</p>
      )}
    </div>
  );
}
