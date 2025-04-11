import pandas as pd
from sqlalchemy.orm import Session
from datetime import datetime
from models import Player, Team, Category, Match, Statistics

def process_excel_data(db: Session, file_path: str):
    # Leer las hojas del Excel
    players_df = pd.read_excel(file_path, sheet_name="Lista")
    stats_df = pd.read_excel(file_path, sheet_name="Estadisticas")
    results_df = pd.read_excel(file_path, sheet_name="Resultados")

    # Procesar categorías
    categories = {}
    for category_name in players_df["Categoría"].unique():
        category = Category(name=category_name, description=f"Equipo de {category_name}")
        db.add(category)
        db.flush()
        categories[category_name] = category.id

    # Procesar equipos
    teams = {}
    for _, row in players_df.groupby(["Categoría", "Equipo"]).first().iterrows():
        team = Team(
            name=row["Equipo"],
            category_id=categories[row["Categoría"]],
            coach=row.get("Entrenador", ""),
            founded_date=datetime.now().date()  # Fecha por defecto
        )
        db.add(team)
        db.flush()
        teams[row["Equipo"]] = team.id

    # Procesar jugadores
    for _, row in players_df.iterrows():
        player = Player(
            name=row["Nombre"],
            position=row["Posición"],
            number=row["Número"],
            birth_date=datetime.strptime(row["Fecha Nacimiento"], "%d/%m/%Y").date(),
            height=float(row["Altura"].replace("m", "")),
            weight=float(row["Peso"].replace("kg", "")),
            team_id=teams[row["Equipo"]],
            is_active=True
        )
        db.add(player)
        db.flush()

    # Procesar partidos
    matches = {}
    for _, row in results_df.iterrows():
        match = Match(
            date=datetime.strptime(row["Fecha"], "%d/%m/%Y").date(),
            opponent=row["Rival"],
            location=row["Ubicación"],
            team_id=teams[row["Equipo"]],
            score_team=row["Goles a Favor"],
            score_opponent=row["Goles en Contra"],
            is_home=row["Local"] == "Sí"
        )
        db.add(match)
        db.flush()
        matches[(row["Fecha"], row["Equipo"])] = match.id

    # Procesar estadísticas
    for _, row in stats_df.iterrows():
        match_date = datetime.strptime(row["Fecha"], "%d/%m/%Y").date()
        team = row["Equipo"]
        match_id = matches.get((match_date, team))
        
        if match_id:
            player = db.query(Player).filter(
                Player.name == row["Jugador"],
                Player.team_id == teams[team]
            ).first()
            
            if player:
                stats = Statistics(
                    player_id=player.id,
                    match_id=match_id,
                    goals=row["Goles"],
                    assists=row["Asistencias"],
                    yellow_cards=row["Tarjetas Amarillas"],
                    red_cards=row["Tarjetas Rojas"],
                    minutes_played=row["Minutos Jugados"]
                )
                db.add(stats)

    db.commit() 