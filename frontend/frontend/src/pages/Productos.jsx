import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import api from '../services/api'
import ProductoModal from './ProductoModal'
import * as XLSX from 'xlsx'

const Productos = () => {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [busqueda, setBusqueda] = useState('')
  const [modalAbierto, setModalAbierto] = useState(false)
  const [productoEditando, setProductoEditando] = useState(null)

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await api.get('/products', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setProductos(res.data)
      } catch (err) {
        console.error('Error al obtener productos:', err)
      } finally {
        setCargando(false)
      }
    }

    fetchProductos()
  }, [])

  const crearProducto = async (nuevoProducto) => {
    try {
      const token = localStorage.getItem('token')
      const res = await api.post('/products', nuevoProducto, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setProductos([...productos, res.data])
    } catch (error) {
      console.error('Error al crear producto:', error)
    }
  }

  const actualizarProducto = async (id, datosActualizados) => {
    try {
      const token = localStorage.getItem('token')
      const res = await api.put(`/products/${id}`, datosActualizados, {
        headers: { Authorization: `Bearer ${token}` }
      })

      setProductos((prev) =>
        prev.map((prod) => (prod._id === id ? res.data : prod))
      )
    } catch (error) {
      console.error('Error al actualizar producto:', error)
    }
  }

  const eliminarProducto = async (id) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) return

    try {
      const token = localStorage.getItem('token')
      await api.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setProductos((prev) => prev.filter((prod) => prod._id !== id))
    } catch (error) {
      console.error('Error al eliminar producto:', error)
    }
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const data = await file.arrayBuffer()
    const workbook = XLSX.read(data)
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]
    const productosExcel = XLSX.utils.sheet_to_json(worksheet)

    try {
      const token = localStorage.getItem('token')
      for (const prod of productosExcel) {
        await api.post('/products', prod, {
          headers: { Authorization: `Bearer ${token}` }
        })
      }
      alert('Productos importados correctamente')
      window.location.reload()
    } catch (err) {
      console.error('Error al importar:', err)
      alert('Ocurrió un error al importar productos')
    }
  }

  const productosFiltrados = productos.filter((prod) =>
    prod.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div className='flex'>
      <Sidebar />
      <main className='flex-1 p-6 bg-gray-100 min-h-screen'>
        <div className='flex justify-end items-center mb-6'>
          <h1 className='text-2xl font-bold text-sky-700'>Productos</h1>
        </div>

        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4'>
          <input
            type='text'
            placeholder='Buscar producto...'
            className='border rounded px-4 py-2 w-full sm:w-1/2'
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <div className='flex gap-2'>
            <button
              onClick={() => {
                setProductoEditando(null)
                setModalAbierto(true)
              }}
              className='bg-sky-700 hover:bg-sky-800 text-white px-4 py-2 rounded'
            >
              Crear producto
            </button>
            <input
              type='file'
              accept='.xlsx, .xls, .csv'
              onChange={handleFileUpload}
              className='border rounded px-4 py-2 cursor-pointer text-sm'
            />
          </div>
        </div>

        {cargando ? (
          <p className='text-gray-500'>Cargando productos...</p>
        ) : productosFiltrados.length === 0 ? (
          <p className='text-gray-500 italic'>No hay productos disponibles.</p>
        ) : (
          <div className='overflow-x-auto'>
            <table className='min-w-full bg-white border border-gray-200 rounded shadow'>
              <thead className='bg-sky-700 text-white'>
                <tr>
                  <th className='px-4 py-2 text-left'>Nombre</th>
                  <th className='px-4 py-2 text-left'>Categoría</th>
                  <th className='px-4 py-2 text-left'>Unidad</th>
                  <th className='px-4 py-2 text-left'>Existencias</th>
                  <th className='px-4 py-2 text-left'>Compra</th>
                  <th className='px-4 py-2 text-left'>Venta</th>
                  <th className='px-4 py-2 text-left'>Margen</th>
                  <th className='px-4 py-2 text-left'>Beneficio %</th>
                  <th className='px-4 py-2 text-left'>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productosFiltrados.map((prod) => (
                  <tr
                    key={prod._id}
                    className='border-t border-gray-200 hover:bg-gray-50'
                  >
                    <td className='px-4 py-2'>{prod.nombre}</td>
                    <td className='px-4 py-2'>{prod.categoria}</td>
                    <td className='px-4 py-2'>{prod.unidad}</td>
                    <td className='px-4 py-2'>{prod.stock_actual}</td>
                    <td className='px-4 py-2'>
                      €{prod.precio_compra?.toFixed(2) || '--'}
                    </td>
                    <td className='px-4 py-2'>
                      €{prod.precio_venta?.toFixed(2) || '--'}
                    </td>
                    <td className='px-4 py-2'>
                      {prod.precio_venta && prod.precio_compra
                        ? `€${(prod.precio_venta - prod.precio_compra).toFixed(2)}`
                        : '--'}
                    </td>
                    <td className='px-4 py-2'>
                      {prod.precio_compra && prod.precio_venta
                        ? `${(((prod.precio_venta - prod.precio_compra) / prod.precio_compra) * 100).toFixed(1)}%`
                        : '--'}
                    </td>
                    <td className='px-4 py-2 space-x-2'>
                      <button
                        onClick={() => {
                          setProductoEditando(prod)
                          setModalAbierto(true)
                        }}
                        className='bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm'
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => eliminarProducto(prod._id)}
                        className='bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm'
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <ProductoModal
          isOpen={modalAbierto}
          onClose={() => {
            setModalAbierto(false)
            setProductoEditando(null)
          }}
          onCreate={crearProducto}
          onUpdate={actualizarProducto}
          productoEditando={productoEditando}
        />
      </main>
    </div>
  )
}

export default Productos
