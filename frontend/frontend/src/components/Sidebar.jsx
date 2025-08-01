import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const usuario = JSON.parse(localStorage.getItem('usuario'))

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    navigate('/')
  }

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <>
      {/* Botón hamburguesa SIEMPRE visible */}
      <button
        className='fixed top-4 left-4 z-50 bg-sky-700 p-2 rounded text-white'
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Sidebar colapsable para todos los tamaños */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-sky-700 text-white flex flex-col justify-between p-4 transition-transform duration-300 z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div>
          <h2 className='text-2xl font-bold mb-4 text-center'>BarTrack</h2>

          {usuario && (
            <p className='text-center mb-4 text-sm text-sky-100'>
              👋 Hola, <span className='font-semibold'>{usuario.nombre}</span>
            </p>
          )}

          <nav className='flex flex-col gap-4'>
            <Link
              to='/dashboard'
              onClick={handleLinkClick}
              className='hover:bg-sky-400 p-2 rounded'
            >
              Panel
            </Link>
            <Link
              to='/productos'
              onClick={handleLinkClick}
              className='hover:bg-sky-400 p-2 rounded'
            >
              Productos
            </Link>
            <Link
              to='/movimientos'
              onClick={handleLinkClick}
              className='hover:bg-sky-400 p-2 rounded'
            >
              Movimientos
            </Link>
            <Link
              to='/recuentos'
              onClick={handleLinkClick}
              className='hover:bg-sky-400 p-2 rounded'
            >
              Recuentos
            </Link>
          </nav>
        </div>

        <button
          onClick={() => {
            handleLogout()
            setIsOpen(false)
          }}
          className='mt-6 bg-rose-300 hover:bg-rose-400 text-white py-2 px-4 rounded'
        >
          Cerrar sesión
        </button>
      </div>
    </>
  )
}

export default Sidebar
