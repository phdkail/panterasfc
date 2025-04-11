import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix para los iconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapaUbicacion = ({ ubicacion }) => {
  // Coordenadas de Arena 7 (ejemplo)
  const coordenadas = [19.4326, -99.1332]; // Reemplazar con las coordenadas reales

  return (
    <div className="w-full h-64 rounded-lg overflow-hidden">
      <MapContainer 
        center={coordenadas} 
        zoom={15} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={coordenadas}>
          <Popup>
            {ubicacion}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapaUbicacion; 