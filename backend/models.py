from sqlalchemy import Column, Integer, String, Date

from backend.database import Base


class Animal(Base):
    __tablename__ = "animais"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100), nullable=False)
    especie = Column(String(30), nullable=False)
    situacao = Column(String(30), nullable=False)
    localizacao = Column(String(150), nullable=False)
    dataRegistro = Column(Date, nullable=False)
    caracteristicas = Column(String(500), nullable=False)
    descricaoCaso = Column(String(500), nullable=True)