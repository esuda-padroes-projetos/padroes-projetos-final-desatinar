import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, ArrowLeft } from 'lucide-react'
import { duplicatasAPI, empresasAPI } from '../services/api'
import Card from '../components/Card'
import Button from '../components/Button'
import './NovaDuplicata.css'

function NovaDuplicata() {
  const navigate = useNavigate()
  const [empresas, setEmpresas] = useState([])
  const [formData, setFormData] = useState({
    numero_nota: '',
    valor: '',
    data_emissao: '',
    data_vencimento: '',
    sacador_id: '',
    sacado_id: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    carregarEmpresas()
  }, [])

  const carregarEmpresas = async () => {
    try {
      const response = await empresasAPI.listar()
      setEmpresas(response.data)
    } catch (err) {
      setError('Erro ao carregar empresas. Cadastre empresas antes de criar duplicatas.')
      console.error(err)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const requiredFields = ['numero_nota', 'valor', 'data_emissao', 'data_vencimento', 'sacador_id', 'sacado_id']
    const missingFields = requiredFields.filter(field => !formData[field])
    
    if (missingFields.length > 0) {
      setError('Todos os campos são obrigatórios')
      return
    }

    if (formData.sacador_id === formData.sacado_id) {
      setError('Sacador e Sacado devem ser empresas diferentes')
      return
    }

    try {
      setLoading(true)
      setError(null)
      await duplicatasAPI.criar(formData)
      navigate('/duplicatas')
    } catch (err) {
      setError(err.response?.data?.erro || 'Erro ao criar duplicata')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="nova-duplicata">
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <FileText size={32} />
            Nova Duplicata
          </h1>
          <p className="page-subtitle">
            Cadastre uma nova duplicata no sistema
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

      <Card>
        <form onSubmit={handleSubmit} className="duplicata-form">
          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="numero_nota" className="form-label">
                Número da Nota
              </label>
              <input
                type="text"
                id="numero_nota"
                name="numero_nota"
                value={formData.numero_nota}
                onChange={handleChange}
                className="form-input"
                placeholder="Ex: 12345"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="valor" className="form-label">
                Valor (R$)
              </label>
              <input
                type="number"
                id="valor"
                name="valor"
                value={formData.valor}
                onChange={handleChange}
                className="form-input"
                placeholder="Ex: 1000.00"
                step="0.01"
                min="0"
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="data_emissao" className="form-label">
                Data de Emissão
              </label>
              <input
                type="date"
                id="data_emissao"
                name="data_emissao"
                value={formData.data_emissao}
                onChange={handleChange}
                className="form-input"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="data_vencimento" className="form-label">
                Data de Vencimento
              </label>
              <input
                type="date"
                id="data_vencimento"
                name="data_vencimento"
                value={formData.data_vencimento}
                onChange={handleChange}
                className="form-input"
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="sacador_id" className="form-label">
                Sacador (quem emite)
              </label>
              <select
                id="sacador_id"
                name="sacador_id"
                value={formData.sacador_id}
                onChange={handleChange}
                className="form-select"
                disabled={loading}
              >
                <option value="">Selecione o sacador</option>
                {empresas.map((empresa) => (
                  <option key={empresa.id} value={empresa.id}>
                    {empresa.nome_razao_social} - {empresa.cnpj_cpf}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="sacado_id" className="form-label">
                Sacado (quem paga)
              </label>
              <select
                id="sacado_id"
                name="sacado_id"
                value={formData.sacado_id}
                onChange={handleChange}
                className="form-select"
                disabled={loading}
              >
                <option value="">Selecione o sacado</option>
                {empresas.map((empresa) => (
                  <option key={empresa.id} value={empresa.id}>
                    {empresa.nome_razao_social} - {empresa.cnpj_cpf}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-actions">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/duplicatas')}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
            >
              {loading ? 'Salvando...' : 'Salvar Duplicata'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default NovaDuplicata
