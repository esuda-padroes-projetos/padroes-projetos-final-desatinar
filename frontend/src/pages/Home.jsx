import { Link } from 'react-router-dom'
import { Building2, FileText, ArrowRight } from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1 className="hero-title">Sistema de Duplicatas</h1>
        <p className="hero-subtitle">
          Gerencie empresas e duplicatas com facilidade. 
          Acompanhe o ciclo de vida completo dos documentos fiscais.
        </p>
      </div>

      <div className="features-grid">
        <Card>
          <div className="feature-card">
            <div className="feature-icon">
              <Building2 size={40} />
            </div>
            <h2>Empresas</h2>
            <p>
              Cadastre e gerencie empresas (sacadores e sacados) 
              com informações de CNPJ/CPF e razão social.
            </p>
            <Link to="/empresas">
              <Button variant="outline" size="medium">
                Gerenciar Empresas
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </Card>

        <Card>
          <div className="feature-card">
            <div className="feature-icon">
              <FileText size={40} />
            </div>
            <h2>Duplicatas</h2>
            <p>
              Crie e acompanhe duplicatas através dos estados: 
              Emissão, Aceite e Liquidação.
            </p>
            <Link to="/duplicatas">
              <Button variant="outline" size="medium">
                Ver Duplicatas
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      <Card className="info-card">
        <h3>Como funciona?</h3>
        <div className="info-steps">
          <div className="info-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Cadastre Empresas</h4>
              <p>Registre sacadores (quem emite) e sacados (quem paga)</p>
            </div>
          </div>
          <div className="info-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Crie Duplicatas</h4>
              <p>Emita duplicatas vinculando sacador e sacado</p>
            </div>
          </div>
          <div className="info-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Avance Estados</h4>
              <p>Mova de Emissão → Aceite → Liquidação</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Home
