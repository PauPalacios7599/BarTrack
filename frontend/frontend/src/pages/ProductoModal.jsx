import { useState, useEffect } from 'react'

const ProductoModal = ({ isOpen, onClose, onCreate, onUpdate, productoEditando }) => {
  const [form, setForm] = useState({
    nombre: '',
    categoria: '',
    unidad: '',
    stock_actual: 0,
    precio_compra: '',
    precio_venta: ''
  })

  useEffect(() => {
    if (productoEditando) {
      setForm({
        nombre: productoEditando.nombre || '',
        categoria: productoEditando.categoria || '',
        unidad: productoEditando.unidad || '',
        stock_actual: productoEditando.stock_actual || 0,
        precio_compra: productoEditando.precio_compra || '',
        precio_venta: productoEditando.precio_venta || ''
      })
    } else {
      setForm({
        nombre: '',
        categoria: '',
        unidad: '',
        stock_actual: 0,
        precio_compra: '',
        precio_venta: ''
      })
    }
  }, [productoEditando])

  const handleChange = (e) => {
    const { name, value, type } = e.target
    const parsedValue = type === 'number' ? (value === '' ? '' : parseFloat(value)) : value
    setForm({ ...form, [name]: parsedValue })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.nombre || !form.categoria || !form.unidad) return

    const datosLimpios = {
      ...form,
      stock_actual: parseInt(form.stock_actual),
      precio_compra: form.precio_compra === '' ? null : parseFloat(form.precio_compra),
      precio_venta: form.precio_venta === '' ? null : parseFloat(form.precio_venta)
    }

    if (productoEditando) {
      onUpdate(productoEditando._id, datosLimpios)
    } else {
      onCreate(datosLimpios)
    }
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded shadow w-full max-w-md'>
        <h2 className='text-xl font-bold mb-4 text-sky-700'>
          {productoEditando ? 'Editar producto' : 'Crear producto'}
        </h2>
        <form onSubmit={handleSubmit} className='space-y-3'>
          <input type='text' name='nombre' placeholder='Nombre' value={form.nombre} onChange={handleChange} className='w-full border rounded p-2' required />
          <input type='text' name='categoria' placeholder='Categoría' value={form.categoria} onChange={handleChange} className='w-full border rounded p-2' required />
          <input type='text' name='unidad' placeholder='Unidad' value={form.unidad} onChange={handleChange} className='w-full border rounded p-2' required />
          <input type='number' name='stock_actual' placeholder='Stock inicial' value={form.stock_actual} onChange={handleChange} className='w-full border rounded p-2' required />
          <input type='number' step='0.01' name='precio_compra' placeholder='Precio compra' value={form.precio_compra} onChange={handleChange} className='w-full border rounded p-2' />
          <input type='number' step='0.01' name='precio_venta' placeholder='Precio venta' value={form.precio_venta} onChange={handleChange} className='w-full border rounded p-2' />

          <div className='flex justify-end gap-2 mt-4'>
            <button type='button' onClick={onClose} className='bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded'>Cancelar</button>
            <button type='submit' className='bg-sky-700 text-white hover:bg-sky-800 px-4 py-2 rounded'>
              {productoEditando ? 'Guardar cambios' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductoModal
