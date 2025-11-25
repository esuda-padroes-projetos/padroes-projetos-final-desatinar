import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Building2, ArrowLeft } from 'lucide-react'
import { empresasAPI } from '../services/api'
import Card from '../components/Card'
import Button from '../components/Button'
import './NovaEmpresa.css'

function NovaEmpresa() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nome_razao_social: '',
    cnpj_cpf: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.nome_razao_social || !formData.cnpj_cpf) {
      setError('Todos os campos são obrigatórios')
      return
    }

    try {
      setLoading(true)
      setError(null)
      await empresasAPI.criar(formData)
      navigate('/empresas')
    } catch (err) {
      setError(err.response?.data?.erro || 'Erro ao criar empresa')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="nova-empresa">
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <Building2 size={32} />
            Nova Empresa
          </h1>
          <p className="page-subtitle">
            Cadastre uma nova empresa no sistema
          </p>
        </div>
        <Button 
          variant="secondary" 
          size="medium"
          onClick={() => navigate('/empresas')}
        >
          <ArrowLeft size={20} />
          Voltar
        </Button>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="empresa-form">
          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="nome_razao_social" className="form-label">
              Razão Social / Nome
            </label>
            <input
              type="text"
              id="nome_razao_social"
              name="nome_razao_social"
              value={formData.nome_razao_social}
              onChange={handleChange}
              className="form-input"
              placeholder="Digite a razão social ou nome"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="cnpj_cpf" className="form-label">
              CNPJ / CPF
            </label>
            <input
              type="text"
              id="cnpj_cpf"
              name="cnpj_cpf"
              value={formData.cnpj_cpf}
              onChange={handleChange}
              className="form-input"
              placeholder="Digite o CNPJ ou CPF"
              disabled={loading}
            />
          </div>

          <div className="form-actions">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/empresas')}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
            >
              {loading ? 'Salvando...' : 'Salvar Empresa'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default NovaEmpresa
