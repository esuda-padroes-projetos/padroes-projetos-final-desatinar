import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FileText, ArrowLeft, ArrowRight, Building2, Calendar, DollarSign, CheckCircle2 } from 'lucide-react'
import { duplicatasAPI, empresasAPI } from '../services/api'
import Card from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'
import './DetalheDuplicata.css'

function DetalheDuplicata() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [duplicata, setDuplicata] = useState(null)
  const [sacador, setSacador] = useState(null)
  const [sacado, setSacado] = useState(null)
  const [loading, setLoading] = useState(true)
  const [avancando, setAvancando] = useState(false)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    carregarDados()
  }, [id])

  const carregarDados = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await duplicatasAPI.buscar(id)
      const duplicataData = response.data
      setDuplicata(duplicataData)

      const [sacadorRes, sacadoRes] = await Promise.all([
        empresasAPI.buscar(duplicataData.sacador_id),
        empresasAPI.buscar(duplicataData.sacado_id)
      ])
      
      setSacador(sacadorRes.data)
      setSacado(sacadoRes.data)
    } catch (err) {
      setError('Erro ao carregar duplicata')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAvancar = async () => {
    try {
      setAvancando(true)
      setError(null)
      setSuccessMessage(null)
      const response = await duplicatasAPI.avancar(id)
      setSuccessMessage(response.data.messagem || 'Status avançado com sucesso!')
      await carregarDados()
    } catch (err) {
      setError(err.response?.data?.erro || 'Erro ao avançar status')
      console.error(err)
    } finally {
      setAvancando(false)
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

  const podeAvancar = duplicata?.status !== 'LIQUIDACAO'

  const getProximoStatus = () => {
    const statusMap = {
      'EMISSAO': 'ACEITE',
      'ACEITE': 'LIQUIDACAO',
      'LIQUIDACAO': null
    }
    return statusMap[duplicata?.status]
  }

  if (loading) {
    return (
      <div className="detalhe-duplicata">
        <div className="loading">Carregando duplicata...</div>
      </div>
    )
  }

  if (error && !duplicata) {
    return (
      <div className="detalhe-duplicata">
        <Card>
          <div className="error-message">
            {error}
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="detalhe-duplicata">
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <FileText size={32} />
            Duplicata #{duplicata.id}
          </h1>
          <p className="page-subtitle">
            Nota Fiscal {duplicata.numero_nota}
          </p>
        </div>
        <Button 
          variant="secondary" 
          size="medium"
          onClick={() => navigate('/duplicatas')}
        >
          <ArrowLeft size={20} />
          Voltar
        </Button>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="alert alert-success">
          <CheckCircle2 size={20} />
          {successMessage}
        </div>
      )}

      <div className="detalhe-grid">
        <Card>
          <div className="status-section">
            <h2 className="section-title">Status Atual</h2>
            <div className="status-display">
              <Badge variant={duplicata.status.toLowerCase()}>
                {duplicata.status}
              </Badge>
            </div>

            {podeAvancar && (
              <div className="avancar-section">
                <p className="avancar-info">
                  Próximo status: <strong>{getProximoStatus()}</strong>
                </p>
                <Button
                  variant="success"
                  size="large"
                  onClick={handleAvancar}
                  disabled={avancando}
                  className="btn-avancar"
                >
                  {avancando ? 'Avançando...' : 'Avançar Status'}
                  <ArrowRight size={20} />
                </Button>
              </div>
            )}

            {duplicata.status === 'LIQUIDACAO' && (
              <div className="status-final">
                <CheckCircle2 size={24} />
                <p>Duplicata finalizada</p>
              </div>
            )}
          </div>
        </Card>

        <Card>
          <h2 className="section-title">
            <DollarSign size={24} />
            Informações Financeiras
          </h2>
          <div className="info-section">
            <div className="info-item-large">
              <span className="info-label">Valor</span>
              <span className="info-value-large">
                {formatarValor(duplicata.valor)}
              </span>
            </div>
            <div className="info-grid-2">
              <div className="info-item">
                <span className="info-label">Data de Emissão</span>
                <span className="info-value">
                  {formatarData(duplicata.data_emissao)}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Data de Vencimento</span>
                <span className="info-value">
                  {formatarData(duplicata.data_vencimento)}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="empresas-grid">
        <Card>
          <h2 className="section-title">
            <Building2 size={24} />
            Sacador (Emissor)
          </h2>
          {sacador && (
            <div className="empresa-detalhe">
              <div className="empresa-info-item">
                <span className="info-label">Nome/Razão Social</span>
                <span className="info-value">{sacador.nome_razao_social}</span>
              </div>
              <div className="empresa-info-item">
                <span className="info-label">CNPJ/CPF</span>
                <span className="info-value cnpj">{sacador.cnpj_cpf}</span>
              </div>
              <div className="empresa-info-item">
                <span className="info-label">ID</span>
                <span className="info-value">#{sacador.id}</span>
              </div>
            </div>
          )}
        </Card>

        <Card>
          <h2 className="section-title">
            <Building2 size={24} />
            Sacado (Pagador)
          </h2>
          {sacado && (
            <div className="empresa-detalhe">
              <div className="empresa-info-item">
                <span className="info-label">Nome/Razão Social</span>
                <span className="info-value">{sacado.nome_razao_social}</span>
              </div>
              <div className="empresa-info-item">
                <span className="info-label">CNPJ/CPF</span>
                <span className="info-value cnpj">{sacado.cnpj_cpf}</span>
              </div>
              <div className="empresa-info-item">
                <span className="info-label">ID</span>
                <span className="info-value">#{sacado.id}</span>
              </div>
            </div>
          )}
        </Card>
      </div>

      <Card>
        <h2 className="section-title">Ciclo de Vida da Duplicata</h2>
        <div className="timeline">
          <div className={`timeline-item ${duplicata.status === 'EMISSAO' || duplicata.status === 'ACEITE' || duplicata.status === 'LIQUIDACAO' ? 'active' : ''}`}>
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <h4>Emissão</h4>
              <p>Duplicata emitida</p>
            </div>
          </div>
          <div className={`timeline-item ${duplicata.status === 'ACEITE' || duplicata.status === 'LIQUIDACAO' ? 'active' : ''}`}>
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <h4>Aceite</h4>
              <p>Duplicata aceita pelo sacado</p>
            </div>
          </div>
          <div className={`timeline-item ${duplicata.status === 'LIQUIDACAO' ? 'active' : ''}`}>
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <h4>Liquidação</h4>
              <p>Pagamento confirmado</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default DetalheDuplicata
