from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from config.database import Base

class Player(Base):
    __tablename__ = "players"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    position = Column(String)
    number = Column(Integer)
    birth_date = Column(Date)
    height = Column(Float)
    weight = Column(Float)
    team_id = Column(Integer, ForeignKey("teams.id"))
    is_active = Column(Boolean, default=True)

    team = relationship("Team", back_populates="players")
    statistics = relationship("Statistics", back_populates="player")

class Team(Base):
    __tablename__ = "teams"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    category_id = Column(Integer, ForeignKey("categories.id"))
    coach = Column(String)
    founded_date = Column(Date)

    players = relationship("Player", back_populates="team")
    category = relationship("Category", back_populates="teams")
    matches = relationship("Match", back_populates="team")

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    description = Column(String)

    teams = relationship("Team", back_populates="category")

class Match(Base):
    __tablename__ = "matches"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date)
    opponent = Column(String)
    location = Column(String)
    team_id = Column(Integer, ForeignKey("teams.id"))
    score_team = Column(Integer)
    score_opponent = Column(Integer)
    is_home = Column(Boolean)

    team = relationship("Team", back_populates="matches")

class Statistics(Base):
    __tablename__ = "statistics"

    id = Column(Integer, primary_key=True, index=True)
    player_id = Column(Integer, ForeignKey("players.id"))
    match_id = Column(Integer, ForeignKey("matches.id"))
    goals = Column(Integer, default=0)
    assists = Column(Integer, default=0)
    yellow_cards = Column(Integer, default=0)
    red_cards = Column(Integer, default=0)
    minutes_played = Column(Integer, default=0)

    player = relationship("Player", back_populates="statistics")
    match = relationship("Match") 