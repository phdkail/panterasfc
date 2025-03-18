import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jugadoresData from "../data/miembros"; // ✅ Importar los datos actualizados
import "../../src/styles/miembros.css";

export default function Miembros() {
  const [order, setOrder] = useState("default");
  const [jugadores, setJugadores] = useState([...jugadoresData]);
  const [selectedImage, setSelectedImage] = useState(null); // ✅ Modal para imagen ampliada
  const navigate = useNavigate();

  useEffect(() => {
    let sortedPlayers = [...jugadoresData];

    switch (order) {
      case "nombre":
        sortedPlayers.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      case "nro":
        sortedPlayers.sort((a, b) => a.nro - b.nro);
        break;
      case "posicion":
        sortedPlayers.sort((a, b) => a.posicion.localeCompare(b.posicion));
        break;
      default:
        sortedPlayers = [...jugadoresData];
    }

    setJugadores([...sortedPlayers]);
  }, [order]);

  return (
    <div className="players-container">
      <h1>🏆 Jugadores del Equipo 🏆</h1>

      <div className="filters">
        <label>📋 Ordenar por: </label>
        <select onChange={(e) => setOrder(e.target.value)} value={order}>
          <option value="default">🔄 Por defecto</option>
          <option value="nombre">🔠 Nombre</option>
          <option value="nro"># Número</option>
          <option value="posicion">📍 Posición</option>
        </select>
      </div>

      <div className="miembros-cards">
        {jugadores.map((player) => (
          <div className="miembros-card" key={player.chaleco}>
            <img
              src={`/images/jugadores/${player.chaleco}.png`}
              alt={player.nombre}
              onClick={() => setSelectedImage(`/images/jugadores/${player.chaleco}.png`)}
            />
            <h2>{player.nombre}</h2>
            <p>🔢 <strong>Número:</strong> {player.chaleco}</p>
            <p>⭐️ <strong>Media Voto:</strong> {player.puntaje}</p>
            <p>🏅 <strong>MVPs:</strong> {player.mvps}</p>
            <p>🎮 <strong>Partidos Jugados:</strong> {player.partidosJugados}</p>
            <p>⚽️ <strong>Goles:</strong> {player.goles}</p>
            <p>🎯 <strong>Asistencias:</strong> {player.asistencias}</p>
            <p>🟨 <strong>Amarillas:</strong> {player.tarjetasAmarillas}</p>
            <p>🟥 <strong>Rojas:</strong> {player.tarjetasRojas}</p>
            <p>🦵 <strong>Pierna Dominante:</strong> {player.piernaDominante}</p>
            <p>📍 <strong>Posición:</strong> {player.posicion}</p>
          </div>
        ))}
      </div>

      <button className="back-button" onClick={() => navigate("/")}>⬅️ Volver a Inicio</button>
    </div>
  );
}
