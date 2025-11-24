import pytest
from flask import Flask
from config import TestingConfig
from database import db

@pytest.fixture
def app():
    """Instância do Flask configurada para TESTES"""
    app = Flask(__name__)
    app.config.from_object(TestingConfig)

    db.init_app(app)

    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()

@pytest.fixture
def client(app):
    """Simula um cliente da API"""
    return app.test_client()

@pytest.fixture
def db_session(app):
    """Uma sessão de banco de dados limpa"""
    with app.app_context():
        yield db.session