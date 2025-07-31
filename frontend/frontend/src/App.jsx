import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import PrivateRoute from './components/PrivateRoute'
import Productos from './pages/Productos'
import Movimientos from './pages/Movimientos'
import Recuentos from './pages/Recuentos'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/productos' element={<Productos />} />
        <Route path='/movimientos' element={<Movimientos />} />
        <Route path='/recuentos' element={<Recuentos />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
