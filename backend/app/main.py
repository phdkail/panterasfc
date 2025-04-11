from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import jugadores, partidos, estadisticas
from app import init_app

app = FastAPI(title="Panteras FC API")

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inicializar la aplicación
init_app()

# Incluir rutas
app.include_router(jugadores.router, prefix="/api/jugadores", tags=["jugadores"])
app.include_router(partidos.router, prefix="/api/partidos", tags=["partidos"])
app.include_router(estadisticas.router, prefix="/api/estadisticas", tags=["estadisticas"])

@app.get("/")
async def root():
    return {"message": "Bienvenido a la API de Panteras FC"} 