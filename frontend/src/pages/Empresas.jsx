import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Building2, AlertCircle } from 'lucide-react'
import { empresasAPI } from '../services/api'
import Card from '../components/Card'
import Button from '../components/Button'
import './Empresas.css'

function Empresas() {
  const [empresas, setEmpresas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    carregarEmpresas()
  }, [])

  const carregarEmpresas = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await empresasAPI.listar()
      setEmpresas(response.data)
    } catch (err) {
      setError('Erro ao carregar empresas. Verifique se o servidor está rodando.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="empresas">
        <div className="loading">Carregando empresas...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="empresas">
        <Card>
          <div className="error-message">
            <AlertCircle size={24} />
            <p>{error}</p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="empresas">
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <Building2 size={32} />
            Empresas
          </h1>
          <p className="page-subtitle">
            Gerencie as empresas cadastradas no sistema
          </p>
        </div>
        <Link to="/empresas/nova">
          <Button variant="primary" size="medium">
            <Plus size={20} />
            Nova Empresa
          </Button>
        </Link>
      </div>

      {empresas.length === 0 ? (
        <Card>
          <div className="empty-state">
            <Building2 size={48} />
            <h3>Nenhuma empresa cadastrada</h3>
            <p>Comece cadastrando sua primeira empresa</p>
            <Link to="/empresas/nova">
              <Button variant="primary">
                <Plus size={20} />
                Cadastrar Empresa
              </Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="empresas-grid">
          {empresas.map((empresa) => (
            <Card key={empresa.id}>
              <div className="empresa-card">
                <div className="empresa-icon">
                  <Building2 size={24} />
                </div>
                <div className="empresa-info">
                  <h3 className="empresa-nome">{empresa.nome_razao_social}</h3>
                  <p className="empresa-cnpj">{empresa.cnpj_cpf}</p>
                </div>
                <div className="empresa-id">
                  ID: {empresa.id}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default Empresas
