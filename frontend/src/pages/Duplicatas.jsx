import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, FileText, AlertCircle } from 'lucide-react'
import { duplicatasAPI } from '../services/api'
import Card from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'
import './Duplicatas.css'

function Duplicatas() {
  const [duplicatas, setDuplicatas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    carregarDuplicatas()
  }, [])

  const carregarDuplicatas = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await duplicatasAPI.listar()
      setDuplicatas(response.data)
    } catch (err) {
      setError('Erro ao carregar duplicatas. Verifique se o servidor está rodando.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const formatarValor = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor)
  }

  const formatarData = (data) => {
    const [ano, mes, dia] = data.split('-')
    return `${dia}/${mes}/${ano}`
  }

  if (loading) {
    return (
      <div className="duplicatas">
        <div className="loading">Carregando duplicatas...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="duplicatas">
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
    <div className="duplicatas">
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <FileText size={32} />
            Duplicatas
          </h1>
          <p className="page-subtitle">
            Gerencie as duplicatas e seus estados
          </p>
        </div>
        <Link to="/duplicatas/nova">
          <Button variant="primary" size="medium">
            <Plus size={20} />
            Nova Duplicata
          </Button>
        </Link>
      </div>

      {duplicatas.length === 0 ? (
        <Card>
          <div className="empty-state">
            <FileText size={48} />
            <h3>Nenhuma duplicata cadastrada</h3>
            <p>Comece criando sua primeira duplicata</p>
            <Link to="/duplicatas/nova">
              <Button variant="primary">
                <Plus size={20} />
                Cadastrar Duplicata
              </Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="duplicatas-list">
          {duplicatas.map((duplicata) => (
            <Link 
              key={duplicata.id} 
              to={`/duplicatas/${duplicata.id}`}
              className="duplicata-link"
            >
              <Card>
                <div className="duplicata-card">
                  <div className="duplicata-header">
                    <div className="duplicata-main">
                      <h3 className="duplicata-numero">
                        Nota {duplicata.numero_nota}
                      </h3>
                      <Badge variant={duplicata.status.toLowerCase()}>
                        {duplicata.status}
                      </Badge>
                    </div>
                    <div className="duplicata-valor">
                      {formatarValor(duplicata.valor)}
                    </div>
                  </div>
                  
                  <div className="duplicata-info-grid">
                    <div className="duplicata-info-item">
                      <span className="info-label">Emissão</span>
                      <span className="info-value">
                        {formatarData(duplicata.data_emissao)}
                      </span>
                    </div>
                    <div className="duplicata-info-item">
                      <span className="info-label">Vencimento</span>
                      <span className="info-value">
                        {formatarData(duplicata.data_vencimento)}
                      </span>
                    </div>
                    <div className="duplicata-info-item">
                      <span className="info-label">Sacador</span>
                      <span className="info-value">ID {duplicata.sacador_id}</span>
                    </div>
                    <div className="duplicata-info-item">
                      <span className="info-label">Sacado</span>
                      <span className="info-value">ID {duplicata.sacado_id}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Duplicatas
