from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.schemas.jugador import JugadorCreate, JugadorResponse
from app.models.jugador import Jugador

router = APIRouter()

@router.get("/", response_model=List[JugadorResponse])
def get_jugadores(db: Session = Depends(get_db)):
    jugadores = db.query(Jugador).all()
    return jugadores

@router.get("/{jugador_id}", response_model=JugadorResponse)
def get_jugador(jugador_id: int, db: Session = Depends(get_db)):
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
    db_jugador = db.query(Jugador).filter(Jugador.id == jugador_id).first()
    if db_jugador is None:
        raise HTTPException(status_code=404, detail="Jugador no encontrado")
    db.delete(db_jugador)
    db.commit()
    return {"message": "Jugador eliminado exitosamente"} 