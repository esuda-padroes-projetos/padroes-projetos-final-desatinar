import enum
from database import db

class StatusDuplicata(enum.Enum):
    """
    Define os estados possíveis da duplicata
    """
    EMISSAO = "EMISSAO"
    ACEITE = "ACEITE"
    LIQUIDACAO = "LIQUIDACAO"

class Empresa(db.Model):
    """
    Representação do Sacador (quem emite a nota) e do Sacado (quem paga)
    """
    __tablename__ = 'empresas'

    id = db.Column(db.Integer, primary_key=True)
    nome_razao_social = db.Column(db.String(100), nullable=False)
    cnpj_cpf = db.Column(db.String(20), unique=True, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "nome_razao_social": self.nome_razao_social,
            "cnpj_cpf": self.cnpj_cpf
        }
    
class Duplicata(db.Model):
    """
    Documento fiscal. Conecta duas empresas e possui um ciclo de vida definido pelo Status.
    """
    __tablename__ = 'duplicatas'
    
    id = db.Column(db.Integer, primary_key=True)
    numero_nota = db.Column(db.String(50), nullable=False)
    valor = db.Column(db.Float, nullable=False)
    data_emissao = db.Column(db.String(20), nullable=False)
    data_vencimento = db.Column(db.String(20), nullable=False)
    status = db.Column(db.Enum(StatusDuplicata), default=StatusDuplicata.EMISSAO, nullable=False)
    sacador_id = db.Column(db.Integer, db.ForeignKey('empresas.id'), nullable=False)
    sacado_id = db.Column(db.Integer, db.ForeignKey('empresas.id'), nullable=False)
    
    sacador = db.relationship('Empresa', foreign_keys=[sacador_id])
    sacado = db.relationship('Empresa', foreign_keys=[sacado_id])

    def to_dict(self):
        return {
            "id": self.id,
            "numero_nota": self.numero_nota,
            "valor": self.valor,
            "data_emissao": self.data_emissao,
            "data_vencimento": self.data_vencimento,
            "status": self.status.name,
            "sacador_id": self.sacador_id,
            "sacado_id": self.sacado_id
        }