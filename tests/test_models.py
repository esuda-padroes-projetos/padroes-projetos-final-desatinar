from models import Empresa, Duplicata, StatusDuplicata

def test_criar_empresa(db_session):
    """Testa se a empresa é salva no banco com sucesso"""
    nova_empresa = Empresa(nome_razao_social="Tech Rodi PE", cnpj_cpf="123456789")

    db_session.add(nova_empresa)
    db_session.commit()

    empresa_db = Empresa.query.first()
    assert empresa_db is not None
    assert empresa_db.nome_razao_social == "Tech Rodi PE"

def test_status_inicial_duplicata(db_session):
    sacador = Empresa(nome_razao_social="Sullivan", cnpj_cpf="987654321")
    sacado = Empresa(nome_razao_social="LB Dev", cnpj_cpf="147852369")
    
    db_session.add_all([sacador, sacado])
    db_session.commit()

    duplicata = Duplicata(
        numero_nota="001",
        valor=100.10,
        data_emissao="2025-10-23",
        data_vencimento="2025-11-23",
        sacador_id=sacador.id,
        sacado_id=sacado.id
    )

    db_session.add(duplicata)
    db_session.commit()

    assert duplicata.status == StatusDuplicata.EMISSAO
    assert duplicata.data_emissao == "2025-10-23"