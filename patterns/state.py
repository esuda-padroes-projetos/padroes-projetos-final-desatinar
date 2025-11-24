from abc import ABC, abstractmethod
from models import StatusDuplicata

class EstadoDuplicata(ABC):
    """Interface que define as operações permitidas em cada estado"""

    @abstractmethod
    def avancar(self, duplicata):
        """Tenta mover a duplicada para o próximo estado."""
        pass

class EstadoEmissao(EstadoDuplicata):
    def avancar(self, duplicata):
        duplicata.status = StatusDuplicata.ACEITE
        return "Duplicata aceita. Aguardando pagamento."

class EstadoAceite(EstadoDuplicata):
    def avancar(self, duplicata):
        duplicata.status = StatusDuplicata.LIQUIDACAO
        return "Duplicada liquidada. Processo finalizado."
    
class EstadoLiquidacao(EstadoDuplicata):
    def avancar(self, duplicata):
        raise ValueError("Erro: Duplicata já está finalizada.")
    
def obter_estado(status: StatusDuplicata) -> EstadoDuplicata:
    mapa = {
        StatusDuplicata.EMISSAO: EstadoEmissao(),
        StatusDuplicata.ACEITE: EstadoAceite(),
        StatusDuplicata.LIQUIDACAO: EstadoLiquidacao()
    }

    return mapa.get(status)