import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Sobre from './pages/Sobre'
import Projetos from './pages/Projetos'
import Contatos from './pages/Contatos'
import NotFound from './pages/NotFound'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="sobre" element={<Sobre />} />
        <Route path="projetos" element={<Projetos />} />
        <Route path="contatos" element={<Contatos />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
