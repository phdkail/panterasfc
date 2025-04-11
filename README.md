# Panteras FC - Sitio Web Oficial

Este es el sitio web oficial del equipo Panteras FC, desarrollado con React, Vite, Tailwind CSS y Node.js.

## Estructura del Proyecto

```
Panteras/
├── frontend/                 # Aplicación React/Vite
│   ├── public/              # Archivos estáticos
│   │   ├── images/         # Imágenes del sitio
│   │   └── favicon.ico     # Favicon
│   ├── src/                # Código fuente
│   │   ├── components/     # Componentes React
│   │   ├── pages/         # Páginas principales
│   │   ├── App.jsx        # Componente principal
│   │   └── main.jsx       # Punto de entrada
│   ├── index.html         # Plantilla HTML
│   └── package.json       # Dependencias frontend
│
├── backend/                # Servidor Node.js
│   ├── data/              # Datos del equipo
│   │   └── PanterasFC.xlsx # Archivo Excel con estadísticas
│   ├── src/               # Código fuente
│   │   ├── routes/        # Rutas de la API
│   │   ├── services/      # Servicios (Excel, etc.)
│   │   └── index.js       # Punto de entrada
│   └── package.json       # Dependencias backend
│
├── tailwind.config.js     # Configuración de Tailwind
└── postcss.config.js      # Configuración de PostCSS
```

## Requisitos Previos

- Node.js (v16 o superior)
- npm (v8 o superior)
- Excel (para editar el archivo de estadísticas)

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/panteras.git
cd panteras
```

2. Instalar dependencias del frontend:
```bash
cd frontend
npm install
```

3. Instalar dependencias del backend:
```bash
cd ../backend
npm install
```

## Dependencias Principales

### Frontend
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.1",
    "framer-motion": "^11.0.5",
    "tailwindcss": "^3.4.1",
    "postcss": "^8.4.35",
    "autoprefixer": "^10.4.17"
  }
}
```

### Backend
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "exceljs": "^4.4.0"
  }
}
```

## Configuración

1. Asegúrate de que el archivo Excel `PanterasFC.xlsx` esté en la carpeta `backend/data/`
2. El archivo Excel debe contener las siguientes hojas:
   - Estadisticas
   - Jornadas
   - Resultados

## Ejecución

1. Iniciar el servidor backend:
```bash
cd backend
npm start
```

2. Iniciar el frontend:
```bash
cd frontend
npm run dev
```

3. Abrir el navegador en `http://localhost:5173`

## Características

- Visualización de estadísticas de jugadores
- Calendario de partidos
- Resultados de jornadas anteriores
- Diseño responsive con Tailwind CSS
- Animaciones con Framer Motion

## Mantenimiento

Para actualizar las estadísticas:
1. Editar el archivo `PanterasFC.xlsx` en la carpeta `backend/data/`
2. Reiniciar el servidor backend

## Solución de Problemas

Si encuentras algún error:
1. Verifica que el servidor backend esté corriendo
2. Asegúrate de que el archivo Excel esté en la ubicación correcta
3. Revisa la consola del navegador para mensajes de error
4. Verifica los logs del servidor backend

## Contribución

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -am 'Agrega nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Crea un Pull Request 