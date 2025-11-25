from flask import Flask, request, jsonify
from flask_cors import CORS
from config import DevelopmentConfig
from database import db
from models import Empresa, Duplicata, StatusDuplicata
from patterns.service import processar_avanco_duplicata

def create_app(config_class=DevelopmentConfig):
    """Cria e configura o app Flask"""
    app = Flask(__name__)
    app.config.from_object(config_class)
    CORS(app)

    db.init_app(app)

    with app.app_context():
        db.create_all()

    @app.route('/empresas', methods=['GET'])
    def listar_empresas():
        empresas = Empresa.query.all()
        return jsonify([e.to_dict() for e in empresas]), 200
    
    @app.route('/empresas/<int:id>', methods=['GET'])
    def buscar_empresa(id):
        empresa = Empresa.query.get_or_404(id)
        return jsonify(empresa.to_dict()), 200

    @app.route('/empresas', methods=['POST'])
    def criar_empresa():
        data = request.json

        empresa = Empresa(
            nome_razao_social=data.get('nome_razao_social'),
            cnpj_cpf=data.get('cnpj_cpf')
        )
        db.session.add(empresa)

        try:
            db.session.commit()
            return jsonify(empresa.to_dict()), 201
        
        except Exception as e:
            db.session.rollback()
            return jsonify({"erro": "Dados inválidos ou duplicados"}), 400
        
    @app.route('/duplicatas', methods=['GET'])
    def listar_duplicatas():
        duplicatas = Duplicata.query.all()
        return jsonify([d.to_dict() for d in duplicatas]), 200
    
    @app.route('/duplicatas/<int:id>', methods=['GET'])
    def buscar_duplicata_por_id(id):
        duplicata = Duplicata.query.get_or_404(id)
        return jsonify(duplicata.to_dict()), 200
        
    @app.route('/duplicatas', methods=['POST'])
    def criar_duplicata():
        data = request.json

        try:
            nova_duplicata = Duplicata(
                numero_nota=data['numero_nota'],
                valor=float(data['valor']),
                data_emissao=data['data_emissao'],
                data_vencimento=data['data_vencimento'],
                sacador_id=int(data['sacador_id']),
                sacado_id=int(data['sacado_id'])
            )
            db.session.add(nova_duplicata)
            db.session.commit()

            return jsonify(nova_duplicata.to_dict()), 201
        except Exception as e:
            return jsonify({"erro": str(e)}), 400
        
    @app.route('/duplicatas/<int:id>/avancar', methods=['PUT'])
    def avancar_status(id):
        """Rota que chama a Service que está encapsulando os padrões State e Observer"""
        duplicata = Duplicata.query.get_or_404(id)

        try:
            mensangem = processar_avanco_duplicata(duplicata)
            db.session.commit()
            
            return jsonify({
                "messagem": mensangem,
                "status_atual": duplicata.status.name
            }), 200
        
        except ValueError as e:
            return jsonify({"erro": str(e)}), 400
        except Exception as e:
            return jsonify({"erro": "Erro interno do servidor"}), 500
        
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
