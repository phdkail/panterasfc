from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime

class PartidoBase(BaseModel):
    fecha: datetime
    rival: str
    resultado: str
    jornada: int
    torneo: str
    local: str
    visitante: str
    resultado_local: Optional[int] = None
    resultado_visitante: Optional[int] = None
    temporada: str
    estadio: Optional[str] = None
    arbitro: Optional[str] = None

class PartidoCreate(PartidoBase):
    pass

class PartidoResponse(PartidoBase):
    id: int

    class Config:
        orm_mode = True 