import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import api from '../services/api'

const Movimientos = () => {
  const [movimientos, setMovimientos] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const fetchMovimientos = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await api.get('/movements', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setMovimientos(res.data)
      } catch (error) {
        console.error('❌ Error al obtener movimientos:', error)
      } finally {
        setCargando(false)
      }
    }

    fetchMovimientos()
  }, [])

  const movimientosFiltrados = movimientos.filter((mov) =>
    mov.producto?.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
    mov.producto?._id?.includes(busqueda)
  )

  return (
    <div className='flex'>
      <Sidebar />
      <main className='flex-1 p-6 bg-gray-100 min-h-screen'>
        <div className='flex justify-center sm:justify-end items-center mb-6 px-4'>
          <h1 className='text-2xl font-bold text-sky-700'>Movimientos</h1>
        </div>

        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4'>
          <input
            type='text'
            placeholder='Buscar por nombre o ID...'
            className='border rounded px-4 py-2 w-full sm:w-1/2'
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        {cargando ? (
          <p className='text-gray-500'>Cargando movimientos...</p>
        ) : movimientosFiltrados.length === 0 ? (
          <p className='text-gray-500 italic'>No hay movimientos disponibles.</p>
        ) : (
          <div className='overflow-x-auto'>
            <table className='min-w-full bg-white border border-gray-200 rounded shadow'>
              <thead className='bg-sky-700 text-white'>
                <tr>
                  <th className='px-4 py-2 text-left'>Tipo</th>
                  <th className='px-4 py-2 text-left'>Cantidad</th>
                  <th className='px-4 py-2 text-left'>Producto</th>
                  <th className='px-4 py-2 text-left'>ID</th>
                  <th className='px-4 py-2 text-left'>Fecha</th>
                  <th className='px-4 py-2 text-left'>Usuario</th>
                </tr>
              </thead>
              <tbody>
                {movimientosFiltrados.map((mov) => (
                  <tr
                    key={mov._id}
                    className='border-t border-gray-200 hover:bg-gray-50'
                  >
                    <td className='px-4 py-2 capitalize'>
                      {mov.tipo === 'entrada' ? 'Entrada' : 'Salida'}
                    </td>
                    <td className='px-4 py-2'>{mov.cantidad}</td>
                    <td className='px-4 py-2'>{mov.producto?.nombre || '--'}</td>
                    <td className='px-4 py-2'>{mov.producto?._id || '--'}</td>
                    <td className='px-4 py-2'>
                      {new Date(mov.createdAt).toLocaleString()}
                    </td>
                    <td className='px-4 py-2'>
                      {mov.usuario?.nombre || 'Sistema'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}

export default Movimientos
