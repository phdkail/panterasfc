from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.estadistica import Estadistica
from app.schemas.estadistica import EstadisticaCreate, EstadisticaResponse

router = APIRouter()

@router.get("/", response_model=List[EstadisticaResponse])
def get_estadisticas(db: Session = Depends(get_db)):
    estadisticas = db.query(Estadistica).all()
    return estadisticas

@router.get("/{estadistica_id}", response_model=EstadisticaResponse)
def get_estadistica(estadistica_id: int, db: Session = Depends(get_db)):
    estadistica = db.query(Estadistica).filter(Estadistica.id == estadistica_id).first()
    if estadistica is None:
        raise HTTPException(status_code=404, detail="Estadística no encontrada")
    return estadistica

@router.post("/", response_model=EstadisticaResponse)
def create_estadistica(estadistica: EstadisticaCreate, db: Session = Depends(get_db)):
    db_estadistica = Estadistica(**estadistica.dict())
    db.add(db_estadistica)
    db.commit()
    db.refresh(db_estadistica)
    return db_estadistica

@router.put("/{estadistica_id}", response_model=EstadisticaResponse)
def update_estadistica(estadistica_id: int, estadistica: EstadisticaCreate, db: Session = Depends(get_db)):
    db_estadistica = db.query(Estadistica).filter(Estadistica.id == estadistica_id).first()
    if db_estadistica is None:
        raise HTTPException(status_code=404, detail="Estadística no encontrada")
    for key, value in estadistica.dict().items():
        setattr(db_estadistica, key, value)
    db.commit()
    db.refresh(db_estadistica)
    return db_estadistica

@router.delete("/{estadistica_id}")
def delete_estadistica(estadistica_id: int, db: Session = Depends(get_db)):
    db_estadistica = db.query(Estadistica).filter(Estadistica.id == estadistica_id).first()
    if db_estadistica is None:
        raise HTTPException(status_code=404, detail="Estadística no encontrada")
    db.delete(db_estadistica)
    db.commit()
    return {"message": "Estadística eliminada exitosamente"} 