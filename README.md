# Projeto DUPE (FullStack) - Rodrigo Santos e Guilherme Santos

Sistema completo para gerenciar Empresas e Duplicatas usando Flask e SQLAlchemy no backend, e React no frontend.
O projeto demonstra o uso dos padrões de projeto State e Observer para controlar o ciclo de
vida das duplicatas e notificar observadores quando o estado muda.

## Estrutura principal

### Backend
- `app.py`: app factory e rotas REST com CORS configurado
- `config.py`: configurações `DevelopmentConfig` e `TestingConfig`
- `database.py`: instância `db = SQLAlchemy()` centralizada
- `models.py`: modelos `Empresa`, `Duplicata` e enum `StatusDuplicata`
- `patterns/`:
  - `state.py`: implementação dos estados `EstadoEmissao`, `EstadoAceite`, `EstadoLiquidacao`
  - `observer.py`: `Notificador` e observadores (logs e emails simulados)
  - `service.py`: orquestra `state` e `observer` para avançar estados
- `tests/`: testes unitários (`conftest.py`, `test_models.py`, `test_state.py`, `test_observer.py`)
- `run.py`: pequeno script de demonstração do padrão (na raiz)

### Frontend
- `frontend/`: aplicação React com Vite
  - `src/components/`: componentes reutilizáveis (Layout, Card, Button, Badge)
  - `src/pages/`: páginas da aplicação (Home, Empresas, Duplicatas)
  - `src/services/`: integração com API via Axios
  - Design responsivo com paleta de cores personalizada
  - Interface limpa e acessível

## Requisitos

### Backend
- Python 3.11+ (testado com Python 3.14)
- Pip e venv
- Dependências listadas em `requirements.txt`

### Frontend
- Node.js 16+ e npm
- Navegador moderno

## Instalação e execução

### Configuração do Backend
1. Criar e ativar um virtualenv
```bash
python -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate
pip install -r requirements.txt
```

2. Rodar a aplicação Flask
```bash
python app.py
```

3. O servidor backend ficará disponível em `http://127.0.0.1:5000/`

### Configuração do Frontend
1. Navegar para o diretório frontend
```bash
cd frontend
```

2. Instalar dependências
```bash
npm install
```

3. Executar o servidor de desenvolvimento
```bash
npm run dev
```

4. O frontend ficará disponível em `http://localhost:3000`

### Executando o projeto completo
Para utilizar o sistema completo, é necessário executar ambos os servidores simultaneamente:
- Backend (Flask) em `http://127.0.0.1:5000`
- Frontend (React) em `http://localhost:3000`

Recomenda-se abrir dois terminais separados, um para cada servidor.

## Funcionalidades

### Interface Web (Frontend)
- Página inicial com visão geral do sistema
- Listagem e cadastro de empresas
- Listagem e criação de duplicatas
- Visualização detalhada de duplicatas com:
  - Informações completas (valor, datas, empresas envolvidas)
  - Timeline visual do ciclo de vida
  - Botão para avançar status da duplicata
  - Badges coloridos indicando o status atual
- Design responsivo para desktop, tablet e mobile

### API REST (Backend)
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

## Tecnologias utilizadas

### Backend
- Flask 3.1.2
- Flask-SQLAlchemy 3.1.1
- Flask-CORS 5.0.0
- SQLAlchemy 2.0.44
- Pytest (testes)

### Frontend
- React 18
- React Router 6
- Axios (cliente HTTP)
- Vite (build tool)
- Lucide React (ícones)

## Observações de desenvolvimento
- A aplicação cria as tabelas (via `db.create_all()`) no contexto do app ao iniciar. Em produção, prefira migrações (Flask-Migrate/Alembic).
- As datas no modelo `Duplicata` são armazenadas como string; considere `db.DateTime` para validações mais robustas.
- `TestingConfig` usa `sqlite:///:memory` para testes unitários.
- O frontend utiliza proxy para se comunicar com o backend, configurado no `vite.config.js`.
- CORS está habilitado no backend para permitir requisições do frontend.

## Demo
- `run.py` contém um exemplo simples de uso do `service.py` para avançar o estado de uma `Duplicata` e imprimir notificações.
- Acesse `http://localhost:3000` após iniciar ambos os servidores para utilizar a interface web completa.
