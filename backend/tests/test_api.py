import pytest

from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
from backend.main import app
from backend.database import Base, get_db

# Banco de dados temporário para os testes
SQLALCHEMY_DATABASE_URL = "sqlite://"

engine_teste = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool
)

SessionTeste = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine_teste
)


@pytest.fixture
def client():
    Base.metadata.create_all(bind=engine_teste)

    def substituir_banco():
        db = SessionTeste()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = substituir_banco

    with TestClient(app) as cliente:
        yield cliente

    app.dependency_overrides.clear()
    Base.metadata.drop_all(bind=engine_teste)




def test_api_inicial(client):
    resposta = client.get("/")

    assert resposta.status_code == 200
    assert resposta.json() == {
        "mensagem": "API Patas do Bem funcionando!"
    }


def test_cadastrar_animal(client):
    dados = {
        "nome": "Rex",
        "especie": "Cachorro",
        "situacao": "Perdido",
        "localizacao": "Centro",
        "dataRegistro": "2026-11-12",
        "caracteristicas": "Caramelo, porte médio",
        "descricaoCaso": "Desapareceu próximo à praça."
    }

    resposta = client.post("/animais", json=dados)

    assert resposta.status_code == 201
    assert resposta.json()["nome"] == "Rex"
    assert resposta.json()["especie"] == "Cachorro"
    assert "id" in resposta.json()

    
def test_listar_animais(client):
    dados = {
        "nome": "Rex",
        "especie": "Cachorro",
        "situacao": "Perdido",
        "localizacao": "Centro",
        "dataRegistro": "2026-11-12",
        "caracteristicas": "Caramelo, porte médio",
        "descricaoCaso": "Desapareceu próximo à praça."
    }

    client.post("/animais", json=dados)

    resposta = client.get("/animais")

    assert resposta.status_code == 200
    assert len(resposta.json()) == 1
    assert resposta.json()[0]["nome"] == "Rex"
    

    assert resposta.status_code == 200
    assert len(resposta.json()) == 1
    assert resposta.json()[0]["nome"] == "Rex"
    
def test_consultar_animal(client):
    dados = {
        "nome": "Rex",
        "especie": "Cachorro",
        "situacao": "Perdido",
        "localizacao": "Centro",
        "dataRegistro": "2026-11-12",
        "caracteristicas": "Caramelo, porte médio",
        "descricaoCaso": "Desapareceu próximo à praça."
    }

    cadastro = client.post("/animais", json=dados)

    animal_id = cadastro.json()["id"]

    resposta = client.get(f"/animais/{animal_id}")

    assert resposta.status_code == 200
    assert resposta.json()["nome"] == "Rex"
    
def test_consultar_animal_inexistente(client):
    resposta = client.get("/animais/999")

    assert resposta.status_code == 404
    assert resposta.json()["detail"] == "Animal não encontrado."