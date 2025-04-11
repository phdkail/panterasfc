from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from app.database import Base

Base = declarative_base()

class Jugador(Base):
    __tablename__ = "jugadores"

    id = Column(Integer, primary_key=True, index=True)
    chaleco = Column(Integer, unique=True, index=True)
    apodo = Column(String, index=True)
    pierna = Column(String)
    posicion = Column(String)
    equipoNacional = Column(String, nullable=True)
    equipoInternacional = Column(String, nullable=True)
    partidosAcumulados = Column(Integer, default=0)
    golesAcumulados = Column(Integer, default=0)
    asistenciasAcumuladas = Column(Integer, default=0)
    media = Column(Float, default=0.0)
    imagen = Column(String, nullable=True)  # Ruta de la imagen 

    estadisticas = relationship("Estadistica", back_populates="jugador") 