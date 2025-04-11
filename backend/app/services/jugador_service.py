from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.jugador import Jugador
from app.schemas.jugador import JugadorCreate, JugadorResponse

def get_jugador(db: Session, jugador_id: int) -> Optional[Jugador]:
    return db.query(Jugador).filter(Jugador.id == jugador_id).first()

def get_jugador_by_chaleco(db: Session, chaleco: str):
    return db.query(Jugador).filter(Jugador.chaleco == chaleco).first()

def get_jugadores(db: Session, skip: int = 0, limit: int = 100) -> List[Jugador]:
    return db.query(Jugador).offset(skip).limit(limit).all()

def create_jugador(db: Session, jugador: JugadorCreate) -> Jugador:
    db_jugador = Jugador(**jugador.dict())
    db.add(db_jugador)
    db.commit()
    db.refresh(db_jugador)
    return db_jugador

def update_jugador(db: Session, jugador_id: int, jugador: JugadorCreate) -> Optional[Jugador]:
    db_jugador = get_jugador(db, jugador_id)
    if db_jugador:
        for key, value in jugador.dict().items():
            setattr(db_jugador, key, value)
        db.commit()
        db.refresh(db_jugador)
    return db_jugador

def delete_jugador(db: Session, jugador_id: int) -> bool:
    db_jugador = get_jugador(db, jugador_id)
    if db_jugador:
        db.delete(db_jugador)
        db.commit()
        return True
    return False

def update_estadisticas(db: Session, jugador_id: int, partidos: int, goles: int, asistencias: int) -> Optional[Jugador]:
    db_jugador = get_jugador(db, jugador_id)
    if db_jugador:
        db_jugador.partidosAcumulados += partidos
        db_jugador.golesAcumulados += goles
        db_jugador.asistenciasAcumuladas += asistencias
        if db_jugador.partidosAcumulados > 0:
            db_jugador.media = (db_jugador.golesAcumulados + db_jugador.asistenciasAcumuladas) / db_jugador.partidosAcumulados
        db.commit()
        db.refresh(db_jugador)
    return db_jugador 