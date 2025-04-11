from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.partido import Partido
from app.schemas.partido import PartidoCreate, PartidoResponse

router = APIRouter()

@router.get("/", response_model=List[PartidoResponse])
def get_partidos(db: Session = Depends(get_db)):
    partidos = db.query(Partido).all()
    return partidos

@router.get("/{partido_id}", response_model=PartidoResponse)
def get_partido(partido_id: int, db: Session = Depends(get_db)):
    partido = db.query(Partido).filter(Partido.id == partido_id).first()
    if partido is None:
        raise HTTPException(status_code=404, detail="Partido no encontrado")
    return partido

@router.post("/", response_model=PartidoResponse)
def create_partido(partido: PartidoCreate, db: Session = Depends(get_db)):
    db_partido = Partido(**partido.dict())
    db.add(db_partido)
    db.commit()
    db.refresh(db_partido)
    return db_partido

@router.put("/{partido_id}", response_model=PartidoResponse)
def update_partido(partido_id: int, partido: PartidoCreate, db: Session = Depends(get_db)):
    db_partido = db.query(Partido).filter(Partido.id == partido_id).first()
    if db_partido is None:
        raise HTTPException(status_code=404, detail="Partido no encontrado")
    for key, value in partido.dict().items():
        setattr(db_partido, key, value)
    db.commit()
    db.refresh(db_partido)
    return db_partido

@router.delete("/{partido_id}")
def delete_partido(partido_id: int, db: Session = Depends(get_db)):
    db_partido = db.query(Partido).filter(Partido.id == partido_id).first()
    if db_partido is None:
        raise HTTPException(status_code=404, detail="Partido no encontrado")
    db.delete(db_partido)
    db.commit()
    return {"message": "Partido eliminado exitosamente"} 