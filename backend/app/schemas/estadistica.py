from pydantic import BaseModel

class EstadisticaBase(BaseModel):
    jugador_id: int
    partido_id: int
    goles: int = 0
    asistencias: int = 0
    minutos_jugados: int = 0
    tarjetas_amarillas: int = 0
    tarjetas_rojas: int = 0
    calificacion: float = 0.0

class EstadisticaCreate(EstadisticaBase):
    pass

class EstadisticaResponse(EstadisticaBase):
    id: int

    class Config:
        from_attributes = True 