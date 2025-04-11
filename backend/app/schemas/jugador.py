from pydantic import BaseModel
from typing import Optional

class JugadorBase(BaseModel):
    chaleco: int
    apodo: str
    pierna: str
    posicion: str
    equipoNacional: Optional[str] = None
    equipoInternacional: Optional[str] = None
    partidosAcumulados: int = 0
    golesAcumulados: int = 0
    asistenciasAcumuladas: int = 0
    media: float = 0.0

class JugadorCreate(JugadorBase):
    pass

class JugadorResponse(JugadorBase):
    id: int

    class Config:
        from_attributes = True 