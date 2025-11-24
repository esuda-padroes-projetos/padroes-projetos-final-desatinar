from patterns.observer import Notificador, Observador
from unittest.mock import MagicMock

def test_notificador_chama_obervadores():
    notificador = Notificador()

    observador_falso = MagicMock(spec=Observador)
    notificador.inscrever(observador_falso)

    duplicata_fake = "Duplicata 001"
    notificador.notificar_todos(duplicata_fake)
    
    observador_falso.atualizar.assert_called_once_with(duplicata_fake)