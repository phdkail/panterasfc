from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models.jugador import Jugador
from ..schemas.jugador import JugadorCreate, JugadorResponse

router = APIRouter(
    prefix="/jugadores",
    tags=["jugadores"],
    responses={404: {"description": "Not found"}},
)

@router.get("/", response_model=List[JugadorResponse])
def read_jugadores(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    jugadores = db.query(Jugador).offset(skip).limit(limit).all()
    return jugadores

@router.get("/{jugador_id}", response_model=JugadorResponse)
def read_jugador(jugador_id: int, db: Session = Depends(get_db)):
    jugador = db.query(Jugador).filter(Jugador.id == jugador_id).first()
    if jugador is None:
        raise HTTPException(status_code=404, detail="Jugador no encontrado")
    return jugador

@router.post("/", response_model=JugadorResponse)
def create_jugador(jugador: JugadorCreate, db: Session = Depends(get_db)):
    db_jugador = Jugador(**jugador.dict())
    db.add(db_jugador)
    db.commit()
    db.refresh(db_jugador)
    return db_jugador

@router.put("/{jugador_id}", response_model=JugadorResponse)
def update_jugador(jugador_id: int, jugador: JugadorCreate, db: Session = Depends(get_db)):
    db_jugador = db.query(Jugador).filter(Jugador.id == jugador_id).first()
    if db_jugador is None:
        raise HTTPException(status_code=404, detail="Jugador no encontrado")
    
    for key, value in jugador.dict().items():
        setattr(db_jugador, key, value)
    
    db.commit()
    db.refresh(db_jugador)
    return db_jugador

@router.delete("/{jugador_id}")
def delete_jugador(jugador_id: int, db: Session = Depends(get_db)):
    jugador = db.query(Jugador).filter(Jugador.id == jugador_id).first()
    if jugador is None:
        raise HTTPException(status_code=404, detail="Jugador no encontrado")
    
    db.delete(jugador)
    db.commit()
    return {"message": "Jugador eliminado exitosamente"}

@router.patch("/{jugador_id}/estadisticas")
def update_estadisticas(
    jugador_id: int,
    partidos: int,
    goles: int,
    asistencias: int,
    db: Session = Depends(get_db)
):
    db_jugador = jugador_service.update_estadisticas(
        db,
        jugador_id=jugador_id,
        partidos=partidos,
        goles=goles,
        asistencias=asistencias
    )
    if db_jugador is None:
        raise HTTPException(status_code=404, detail="Jugador no encontrado")
    return db_jugador 