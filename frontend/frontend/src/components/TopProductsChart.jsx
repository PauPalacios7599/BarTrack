import { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import api from '../services/api'

const TopProductsChart = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const res = await api.get('/movements/mas-vendidos', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        setData(res.data)
      } catch (error) {
        console.error('Error al cargar productos más vendidos:', error)
      }
    }

    fetchTopProducts()
  }, [])

  return (
    <div className='bg-white rounded shadow p-6 mb-10'>
      <h3 className='text-lg font-semibold text-sky-700 mb-4'>
        Productos más vendidos (por salidas)
      </h3>
      {data.length > 0 ? (
        <ResponsiveContainer width='100%' height={300}>
          <BarChart data={data}>
            <XAxis dataKey='nombre' />
            <YAxis />
            <Tooltip />
            <Bar dataKey='totalSalidas' fill='#0284c7' />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className='text-gray-500 italic'>No hay datos disponibles.</p>
      )}
    </div>
  )
}

export default TopProductsChart
