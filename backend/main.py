import logging

from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from backend import models
from backend.database import engine, Base, get_db
from backend.schemas import AnimalCadastro, AnimalResposta
from fastapi.middleware.cors import CORSMiddleware

logger = logging.getLogger(__name__)

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Patas do Bem",
    description="API para gerenciamento da associação Patas do Bem",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def inicio():
    return {
        "mensagem": "API Patas do Bem funcionando!"
    }

@app.post("/animais", response_model=AnimalResposta, status_code=201)
def cadastrar_animal(
    animal: AnimalCadastro,
    db: Session = Depends(get_db)
):
    try:
        novo_animal = models.Animal(**animal.model_dump())

        db.add(novo_animal)
        db.commit()
        db.refresh(novo_animal)

        return novo_animal

    except SQLAlchemyError:
        db.rollback()

        logger.exception("Erro ao cadastrar animal")

        raise HTTPException(
            status_code=500,
            detail="Não foi possível cadastrar o animal. Tente novamente."
        )

@app.get("/animais", response_model=list[AnimalResposta])
def listar_animais(db: Session = Depends(get_db)):
    try:
        animais = db.query(models.Animal).all()

        return animais

    except SQLAlchemyError:
        logger.exception("Erro ao listar animais")

        raise HTTPException(
            status_code=500,
            detail="Não foi possível listar os animais. Tente novamente."
        )

@app.get("/animais/{animal_id}", response_model=AnimalResposta)
def consultar_animal(
    animal_id: int,
    db: Session = Depends(get_db)
):
    try:
        animal = db.query(models.Animal).filter(
            models.Animal.id == animal_id
        ).first()

        if animal is None:
            raise HTTPException(
                status_code=404,
                detail="Animal não encontrado."
            )

        return animal

    except SQLAlchemyError:
        logger.exception("Erro ao consultar animal")

        raise HTTPException(
            status_code=500,
            detail="Não foi possível consultar o animal. Tente novamente."
        )