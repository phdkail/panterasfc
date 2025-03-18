import "../styles/contactCard.css"; // Archivo CSS para estilos

export default function ContactCard() {
  return (
    <div className="contact-card">
      <div className="card-header">
        <img src="/images/kail.jpg" alt="Foto de Kail" className="profile-pic" />
        <h2>Kail</h2>
        <p className="role">Desarrollador | Viajero | Fotógrafo</p>
      </div>

      <div className="card-body">
        <p className="quote">
          "Peekaboo!! Globetrotter!! Liviano de equipaje, trotamundos sin destino, soñador sin límites! 
          Ética, resiliencia, empatía, paciencia y buen humor 🍀❣️✨"
        </p>
        
        <div className="contact-info">
          <p><strong>📍 Ubicación:</strong> Torino, IT 🌎</p>
          <p><strong>📸 Instagram:</strong> <a href="https://www.instagram.com/phdkail" target="_blank">@phdkail</a></p>
          <p><strong>📧 Email:</strong> <a href="mailto:phdkail@gmail.com">phdkail@gmail.com</a></p>
        </div>
      </div>
    </div>
  );
}