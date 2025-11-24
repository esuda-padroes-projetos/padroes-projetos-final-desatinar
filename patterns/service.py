from patterns.state import obter_estado
from patterns.observer import Notificador, LogObserver, EmailOberserver

notificador = Notificador()
notificador.inscrever(LogObserver())
notificador.inscrever(EmailOberserver())

def processar_avanco_duplicata(duplicata):
    """
    FUnção para orquestrar o State e o Observer.
    Recebe uma entidade duplicata, tenta avançar e notifica se der certo
    """

    estado = obter_estado(duplicata.status)
    mensagem = estado.avancar(duplicata)
    notificador.notificar_todos(duplicata)

    return mensagem
    