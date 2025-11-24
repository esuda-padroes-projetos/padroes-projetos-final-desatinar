import os

class Config:
    """Configurações base."""
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class DevelopmentConfig(Config):
    """Para uso em desenvolvimento (criação de um arquivo local)"""
    SQLALCHEMY_DATABASE_URI = 'sqlite:///projeto.db'

class TestingConfig(Config):
    """Para uso nos testes unitários (banco na RAM, apaga quando se fecha)"""
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory'