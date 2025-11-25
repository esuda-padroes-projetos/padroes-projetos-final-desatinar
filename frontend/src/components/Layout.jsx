import { Link, useLocation } from 'react-router-dom'
import { Building2, FileText, Home } from 'lucide-react'
import './Layout.css'

function Layout({ children }) {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">
            <FileText size={28} />
            <span>Sistema de Duplicatas</span>
          </Link>
          
          <div className="navbar-links">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') && location.pathname === '/' ? 'active' : ''}`}
            >
              <Home size={20} />
              <span>Início</span>
            </Link>
            <Link 
              to="/empresas" 
              className={`nav-link ${isActive('/empresas') ? 'active' : ''}`}
            >
              <Building2 size={20} />
              <span>Empresas</span>
            </Link>
            <Link 
              to="/duplicatas" 
              className={`nav-link ${isActive('/duplicatas') ? 'active' : ''}`}
            >
              <FileText size={20} />
              <span>Duplicatas</span>
            </Link>
          </div>
        </div>
      </nav>
      
      <main className="main-content">
        <div className="content-container">
          {children}
        </div>
      </main>
      
      <footer className="footer">
        <div className="footer-container">
          <p>Sistema de Gerenciamento de Duplicatas © 2025</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
