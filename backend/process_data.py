import os
import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base
from services.data_processor import process_excel_data
from app.config import Settings
from app.models.jugador import Jugador
from app.schemas.jugador import JugadorCreate

# Configuración de la base de datos
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///panteras.db")
EXCEL_FILE = os.getenv("EXCEL_FILE", "PanterasFC.xlsx")

def process_excel_data(file_path: str, session):
    # Leer las hojas del Excel
    df_lista = pd.read_excel(file_path, sheet_name='Lista')
    df_estadisticas = pd.read_excel(file_path, sheet_name='Estadisticas')
    df_resultados = pd.read_excel(file_path, sheet_name='Resultados')

    # Procesar jugadores
    for _, row in df_lista.iterrows():
        jugador_data = JugadorCreate(
            chaleco=row['Chaleco'],
            apodo=row['Apodo'],
            pierna=row['Pierna'],
            posicion=row['Posicion'],
            equipoNacional=row.get('Equipo Nacional'),
            equipoInternacional=row.get('Equipo Internacional')
        )
        
        # Buscar estadísticas del jugador
        stats = df_estadisticas[df_estadisticas['Chaleco'] == row['Chaleco']]
        if not stats.empty:
            jugador_data.partidosAcumulados = stats['Partidos Acumulados'].iloc[0]
            jugador_data.golesAcumulados = stats['Goles Acumulados'].iloc[0]
            jugador_data.asistenciasAcumuladas = stats['Asistencias Acumuladas'].iloc[0]
            jugador_data.media = stats['Media'].iloc[0]

        # Crear jugador en la base de datos
        jugador = Jugador(**jugador_data.dict())
        session.add(jugador)

    session.commit()

def main():
    # Cargar configuración
    settings = Settings()
    
    # Crear engine y sesión
    engine = create_engine(settings.DATABASE_URL)
    Session = sessionmaker(bind=engine)
    session = Session()

    try:
        # Procesar datos
        process_excel_data(settings.EXCEL_FILE_PATH, session)
        print("Datos procesados exitosamente")
    except Exception as e:
        print(f"Error al procesar datos: {e}")
        session.rollback()
    finally:
        session.close()

if __name__ == "__main__":
    main() 