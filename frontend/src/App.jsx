import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Empresas from './pages/Empresas'
import Duplicatas from './pages/Duplicatas'
import NovaDuplicata from './pages/NovaDuplicata'
import NovaEmpresa from './pages/NovaEmpresa'
import DetalheDuplicata from './pages/DetalheDuplicata'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/empresas" element={<Empresas />} />
          <Route path="/empresas/nova" element={<NovaEmpresa />} />
          <Route path="/duplicatas" element={<Duplicatas />} />
          <Route path="/duplicatas/nova" element={<NovaDuplicata />} />
          <Route path="/duplicatas/:id" element={<DetalheDuplicata />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
