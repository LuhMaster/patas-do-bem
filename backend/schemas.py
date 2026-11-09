from datetime import date
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


class AnimalCadastro(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)
    
    nome: str = Field(min_length=2, max_length=100)
    especie: Literal["Cachorro", "Gato", "Outro"]
    situacao: Literal["Perdido", "Encontrado", "Adoção"]
    localizacao: str = Field(min_length=3, max_length=150)
    dataRegistro: date
    caracteristicas: str = Field(min_length=3, max_length=500)
    descricaoCaso: str | None = Field(default=None, max_length=500)

class AnimalResposta(AnimalCadastro):
    model_config = ConfigDict(
        from_attributes=True,
        str_strip_whitespace=True
    )

    id: int
