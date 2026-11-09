import pytest

from backend.validacoes import validar_nome


@pytest.mark.parametrize(
    "nome, esperado",
    [
        ("Rex", True),
        ("A", False),
        ("  ", False),
        ("  Mel  ", True),
    ]
)
def test_validar_nome(nome, esperado):
    assert validar_nome(nome) == esperado