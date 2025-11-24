import pytest
from models import Duplicata, StatusDuplicata
from patterns.state import obter_estado

def test_fluxo_completo_sucesso():
    duplicata = Duplicata(status=StatusDuplicata.EMISSAO)

    estado_atual = obter_estado(duplicata.status)
    estado_atual.avancar(duplicata)

    assert duplicata.status == StatusDuplicata.ACEITE

    estado_atual = obter_estado(duplicata.status)
    estado_atual.avancar(duplicata)

    assert duplicata.status == StatusDuplicata.LIQUIDACAO

def test_erro_avancar_liquidacao():
    duplicata = Duplicata(status=StatusDuplicata.LIQUIDACAO)

    estado_atual = obter_estado(duplicata.status)

    with pytest.raises(ValueError, match="Erro: Duplicata já está finalizada"):
        estado_atual.avancar(duplicata)