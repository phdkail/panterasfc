import pandas as pd
import os
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.jugador import Jugador
from app.schemas.jugador import JugadorCreate

def process_jugadores_data():
    # Ruta del archivo Excel
    excel_path = "PanterasFC.xlsx"
    
    # Leer las hojas necesarias
    lista_df = pd.read_excel(excel_path, sheet_name="Lista")
    estadisticas_df = pd.read_excel(excel_path, sheet_name="Estadisticas")
    
    # Ruta de las imágenes
    images_path = "../frontend/frontend/public/assets/jugadores"
    
    # Obtener sesión de base de datos
    db = next(get_db())
    
    try:
        # Procesar cada jugador
        for _, row in lista_df.iterrows():
            # Buscar estadísticas correspondientes
            stats = estadisticas_df[estadisticas_df["Chaleco"] == row["Chaleco"]]
            
            # Crear objeto Jugador
            jugador_data = {
                "chaleco": str(row["Chaleco"]),
                "apodo": row["Apodo"],
                "pierna": row["Pierna Dominante"],
                "posicion": row["Posición Dominante"],
                "equipoNacional": row.get("Equipo Nacional", None),
                "equipoInternacional": row.get("Equipo Internacional", None),
                "partidosAcumulados": int(stats["Partidos"].sum()) if not stats.empty else 0,
                "golesAcumulados": int(stats["Goles"].sum()) if not stats.empty else 0,
                "asistenciasAcumuladas": int(stats["Asistencias"].sum()) if not stats.empty else 0,
                "media": float(stats["Media"].mean()) if not stats.empty else 0.0
            }
            
            # Verificar si la imagen existe
            image_path = os.path.join(images_path, f"{row['Chaleco']}.png")
            if not os.path.exists(image_path):
                print(f"Advertencia: No se encontró la imagen para el jugador {row['Chaleco']}")
            
            # Crear jugador en la base de datos
            jugador = JugadorCreate(**jugador_data)
            db_jugador = Jugador(**jugador.dict())
            db.add(db_jugador)
        
        # Guardar cambios
        db.commit()
        print("Datos de jugadores procesados exitosamente")
        
    except Exception as e:
        db.rollback()
        print(f"Error al procesar los datos: {str(e)}")
    finally:
        db.close()

if __name__ == "__main__":
    process_jugadores_data() 