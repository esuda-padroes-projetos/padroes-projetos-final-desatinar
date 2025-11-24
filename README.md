# faculdade-backend-projeto-DUPE

API REST simples para gerenciar Empresas e Duplicatas usando Flask e SQLAlchemy.
O projeto demonstra o uso dos padrões de projeto State e Observer para controlar o ciclo de
vida das duplicatas e notificar observadores quando o estado muda.

## Estrutura principal
- `app.py`: app factory e rotas REST
- `config.py`: configurações `DevelopmentConfig` e `TestingConfig`
- `database.py`: instância `db = SQLAlchemy()` centralizada
- `models.py`: modelos `Empresa`, `Duplicata` e enum `StatusDuplicata`
- `patterns/`:
  - `state.py`: implementação dos estados `EstadoEmissao`, `EstadoAceite`, `EstadoLiquidacao`
  - `observer.py`: `Notificador` e observadores (logs e emails simulados)
  - `service.py`: orquestra `state` e `observer` para avançar estados
- `tests/`: testes unitários (`conftest.py`, `test_models.py`, `test_state.py`, `test_observer.py`)
- `run.py`: pequeno script de demonstração do padrão (na raiz)

## Requisitos
- Python 3.11+ (testado com Python 3.14)
- Pip e venv
- Dependências listadas em `requirements.txt` (instale com `pip install -r requirements.txt`)

## Instalação e execução
1. Criar e ativar um virtualenv
```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```
2. Rodar a aplicação em modo de desenvolvimento
```bash
python app.py
# ou
FLASK_APP=app.py python -m flask run
```
3. O servidor ficará disponível em `http://127.0.0.1:5000/`.

## Endpoints
- `GET /empresas` — lista todas as empresas
- `GET /empresas/<id>` — busca empresa por id
- `POST /empresas` — cria empresa (json: `nome_razao_social`, `cnpj_cpf`)
- `GET /duplicatas` — lista todas as duplicatas
- `GET /duplicatas/<id>` — busca duplicata por id
- `POST /duplicatas` — cria duplicata (json: `numero_nota`, `valor`, `data_emissao`, `data_vencimento`, `sacador_id`, `sacado_id`)
- `PUT /duplicatas/<id>/avancar` — avança a duplicata para o próximo estado (usa Service + State + Observer)

Observações: `data_emissao` e `data_vencimento` são strings no formato `YYYY-MM-DD` atualmente.

## Testes
- Executar todos os testes
```bash
pytest --cov --cov-report=term-missing
```
- Executar apenas um teste
```bash
pytest -q tests/test_models.py::test_criar_empresa
```

Dicas para evitar `ModuleNotFoundError` ao rodar testes:
- Execute os comandos a partir da raiz do projeto (local onde `app.py` e `config.py` estão)
- Ative o virtualenv antes de rodar o pytest
- Se o pytest não localizar módulos do projeto, adicione `pytest.ini` com `pythonpath = .` ou exporte a variável `PYTHONPATH=$PWD` temporariamente

## Observações de desenvolvimento
- A aplicação cria as tabelas (via `db.create_all()`) no contexto do app ao iniciar. Em produção, prefira migrações (Flask-Migrate/Alembic).
- As datas no modelo `Duplicata` são armazenadas como string; considere `db.DateTime` para validações mais robustas.
- `TestingConfig` usa `sqlite:///:memory` para testes unitários.

## Demo
- `run.py` contém um exemplo simples de uso do `service.py` para avançar o estado de uma `Duplicata` e imprimir notificações.

## Contribuição
- Siga convenções de commits (`feat`, `fix`, `refactor`, `test`, `chore`)
- Garanta que os testes existentes estejam verdes antes de abrir PR

## Licença
Projeto sem licença específica. Adicione um `LICENSE` se necessário.
