# Panteras FC - Sitio Web Oficial

Este es el sitio web oficial del equipo Panteras FC. Sigue estas instrucciones paso a paso para configurar el proyecto en tu computadora.

## 📋 Requisitos Previos

Antes de comenzar, necesitas instalar estos programas en tu computadora:

1. **Node.js y npm** (Administrador de paquetes de Node)
   - Descarga desde: https://nodejs.org/
   - Selecciona la versión "LTS" (Long Term Support)
   - Sigue las instrucciones de instalación
   - Para verificar la instalación, abre la terminal y escribe:
     ```bash
     node --version
     npm --version
     ```

2. **Git** (Sistema de control de versiones)
   - Descarga desde: https://git-scm.com/downloads
   - Sigue las instrucciones de instalación
   - Para verificar la instalación, abre la terminal y escribe:
     ```bash
     git --version
     ```

3. **Excel** (Para editar estadísticas)
   - Microsoft Excel o cualquier programa que pueda abrir archivos .xlsx

## 🚀 Instalación Paso a Paso

### 1. Descargar el Proyecto

1. Abre la terminal (Command Prompt en Windows o Terminal en Mac)
2. Navega a la carpeta donde quieres guardar el proyecto
3. Ejecuta estos comandos:
   ```bash
   git clone https://github.com/tu-usuario/panteras.git
   cd panteras
   ```

### 2. Configurar el Backend (Servidor)

1. Abre la terminal y navega a la carpeta del backend:
   ```bash
   cd backend
   ```

2. Instala las dependencias necesarias:
   ```bash
   npm install
   ```

3. Asegúrate de que el archivo `PanterasFC.xlsx` esté en la carpeta `backend/data/`

### 3. Configurar el Frontend (Interfaz de Usuario)

1. Abre una nueva terminal y navega a la carpeta del frontend:
   ```bash
   cd frontend
   ```

2. Instala las dependencias necesarias:
   ```bash
   npm install
   ```

## 🏃‍♂️ Cómo Iniciar el Proyecto

### IMPORTANTE: Debes abrir DOS terminales diferentes

#### Terminal 1 - Backend
1. Abre una terminal
2. Navega a la carpeta del backend:
   ```bash
   cd backend
   ```
3. Inicia el servidor:
   ```bash
   npm start
   ```
4. Deberías ver un mensaje que dice "Servidor iniciado en el puerto 3000"

#### Terminal 2 - Frontend
1. Abre una NUEVA terminal (no cierres la anterior)
2. Navega a la carpeta del frontend:
   ```bash
   cd frontend
   ```
3. Inicia la aplicación:
   ```bash
   npm run dev
   ```
4. Se abrirá automáticamente tu navegador en http://localhost:3000

## 🔍 Verificar que todo funciona

1. **Backend**:
   - Abre tu navegador y visita: http://localhost:3000/api/jornadas
   - Deberías ver los datos en formato JSON
   - Si ves un error, revisa la terminal del backend

2. **Frontend**:
   - Abre tu navegador y visita: http://localhost:3000
   - Deberías ver la interfaz del sitio web
   - Si no ves nada, revisa la terminal del frontend

## 📝 Actualización de Estadísticas

Para actualizar las estadísticas del equipo:

1. Abre el archivo `PanterasFC.xlsx` en la carpeta `backend/data/`
2. Edita los datos según sea necesario
3. Guarda los cambios
4. Reinicia el servidor backend (detén el servidor con Ctrl+C y vuelve a ejecutar `npm start`)

## ❓ Solución de Problemas Comunes

Si algo no funciona:

1. **El servidor no inicia**
   - Verifica que Node.js esté instalado correctamente
   - Asegúrate de estar en la carpeta correcta (backend o frontend)
   - Revisa que el archivo Excel esté en la ubicación correcta

2. **La página web no se carga**
   - Verifica que el servidor backend esté corriendo
   - Asegúrate de que el frontend esté iniciado
   - Intenta abrir http://localhost:3000 manualmente en tu navegador

3. **Error al instalar dependencias**
   - Asegúrate de tener una conexión a internet estable
   - Intenta ejecutar `npm install` nuevamente
   - Si el problema persiste, contacta al administrador

## 📞 Soporte

Si necesitas ayuda adicional:
- Revisa la documentación en este README
- Contacta al administrador del proyecto
- Crea un issue en el repositorio de GitHub

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

## Contribución

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -am 'Agrega nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Crea un Pull Request 