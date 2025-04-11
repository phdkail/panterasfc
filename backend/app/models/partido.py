from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Partido(Base):
    __tablename__ = "partidos"

    id = Column(Integer, primary_key=True, index=True)
    fecha = Column(DateTime)
    rival = Column(String)
    resultado = Column(String)
    jornada = Column(Integer)
    torneo = Column(String)

    estadisticas = relationship("Estadistica", back_populates="partido") 