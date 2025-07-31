import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import TopProductsChart from '../components/TopProductsChart'
import api from '../services/api'

const Dashboard = () => {
  const usuario = JSON.parse(localStorage.getItem('usuario'))

  const [totalProductos, setTotalProductos] = useState(null)
  const [stockTotal, setStockTotal] = useState(null)
  const [totalMovimientos, setTotalMovimientos] = useState(null)
  const [ultimoRecuento, setUltimoRecuento] = useState(null)

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const productosRes = await api.get('/products')
        const movimientosRes = await api.get('/movements')
        const recuentosRes = await api.get('/recounts')

        const productos = productosRes.data
        const stockSum = productos.reduce((sum, p) => sum + p.stock_actual, 0)

        setTotalProductos(productos.length)
        setStockTotal(stockSum)
        setTotalMovimientos(movimientosRes.data.length)

        if (recuentosRes.data.length > 0) {
          const ultimo = recuentosRes.data[0] 
          setUltimoRecuento(new Date(ultimo.createdAt).toLocaleString())
        } else {
          setUltimoRecuento('Sin registros')
        }
      } catch (error) {
        console.error('Error cargando datos del dashboard:', error)
      }
    }

    fetchDatos()
  }, [])

  return (
    <div className='flex'>
      <Sidebar />

      <main className='flex-1 p-6 bg-gray-100 min-h-screen'>
        {/* Encabezado con saludo alineado a la derecha */}
        <div className='flex justify-end mb-6'>
          <h1 className='text-2xl font-semibold text-sky-700'>
            Bienvenido, {usuario?.nombre}
          </h1>
        </div>

        {/* Tarjetas resumen */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10'>
          <div className='bg-white rounded shadow p-5 text-center'>
            <p className='text-gray-500 text-sm'>Productos</p>
            <h2 className='text-2xl font-bold text-sky-700'>
              {totalProductos !== null ? totalProductos : '--'}
            </h2>
          </div>
          <div className='bg-white rounded shadow p-5 text-center'>
            <p className='text-gray-500 text-sm'>Stock disponible</p>
            <h2 className='text-2xl font-bold text-sky-700'>
              {stockTotal !== null ? stockTotal : '--'}
            </h2>
          </div>
          <div className='bg-white rounded shadow p-5 text-center'>
            <p className='text-gray-500 text-sm'>Movimientos</p>
            <h2 className='text-2xl font-bold text-sky-700'>
              {totalMovimientos !== null ? totalMovimientos : '--'}
            </h2>
          </div>
          <div className='bg-white rounded shadow p-5 text-center'>
            <p className='text-gray-500 text-sm'>Último recuento</p>
            <h2 className='text-2xl font-bold text-sky-700'>
              {ultimoRecuento || '--'}
            </h2>
          </div>
        </div>

        {/* Gráfico de entradas y salidas */}
        <div className='bg-white rounded shadow p-6 mb-10'>
          <h3 className='text-lg font-semibold text-sky-700 mb-2'>
            Gráfico de entradas y salidas (próximamente)
          </h3>
          <div className='h-40 bg-gray-200 rounded flex items-center justify-center text-gray-500'>
            📊 Aquí irá una gráfica con los datos del bar
          </div>
        </div>

        {/* Productos más vendidos */}
        <div className='bg-white rounded shadow p-6 mb-10'>
          <h3 className='text-lg font-semibold text-sky-700 mb-2'>
            Productos más vendidos (por salidas)
          </h3>
          <TopProductsChart />
        </div>

        {/* Últimos movimientos */}
        <div className='bg-white rounded shadow p-6'>
          <h3 className='text-lg font-semibold text-sky-700 mb-2'>
            Últimos movimientos recientes (próximamente)
          </h3>
          <ul className='text-gray-500 italic'>Sin datos aún...</ul>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
