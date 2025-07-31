import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import api from '../services/api'

const Recuentos = () => {
  const [productos, setProductos] = useState([])
  const [productoSeleccionado, setProductoSeleccionado] = useState('')
  const [cantidadContada, setCantidadContada] = useState('')
  const [resultado, setResultado] = useState(null)

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await api.get('/products')
        setProductos(res.data)
      } catch (error) {
        console.error('Error al cargar productos:', error)
      }
    }

    fetchProductos()
  }, [])

  const compararStock = () => {
    const producto = productos.find((p) => p._id === productoSeleccionado)
    if (!producto) return

    const stockActual = producto.stock_actual
    const cantidad = parseInt(cantidadContada)

    if (isNaN(cantidad)) {
      setResultado({ tipo: 'error', mensaje: 'Cantidad inválida' })
      return
    }

    if (cantidad === stockActual) {
      setResultado({
        tipo: 'ok',
        mensaje: `✅ El recuento es correcto. Stock actual: ${stockActual}`
      })
    } else {
      const diferencia = cantidad - stockActual
      setResultado({
        tipo: 'alerta',
        mensaje: `⚠️ Diferencia detectada: ${diferencia > 0 ? '+' : ''}${diferencia}`
      })
    }
  }

  return (
    <div className='flex'>
      <Sidebar />
      <main className='flex-1 p-6 bg-gray-100 min-h-screen'>
        <div className='flex justify-end items-center mb-6'>
          <h1 className='text-2xl font-bold text-sky-700'>Recuento físico</h1>
        </div>

        <div className='bg-white p-6 rounded shadow max-w-xl mx-auto'>
          <h2 className='text-lg font-semibold mb-4'>Introduce los datos del recuento</h2>

          <div className='mb-4'>
            <label className='block mb-1'>Producto:</label>
            <select
              className='w-full border rounded p-2'
              value={productoSeleccionado}
              onChange={(e) => setProductoSeleccionado(e.target.value)}
            >
              <option value=''>Selecciona un producto</option>
              {productos.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className='mb-4'>
            <label className='block mb-1'>Cantidad contada:</label>
            <input
              type='number'
              className='w-full border rounded p-2'
              value={cantidadContada}
              onChange={(e) => setCantidadContada(e.target.value)}
              min={0}
            />
          </div>

          <button
            onClick={compararStock}
            className='bg-sky-700 hover:bg-sky-800 text-white px-4 py-2 rounded'
          >
            Comparar
          </button>

          {resultado && (
            <p
              className={`mt-4 font-semibold ${
                resultado.tipo === 'ok'
                  ? 'text-green-600'
                  : resultado.tipo === 'alerta'
                  ? 'text-orange-500'
                  : 'text-red-500'
              }`}
            >
              {resultado.mensaje}
            </p>
          )}
        </div>
      </main>
    </div>
  )
}

export default Recuentos
