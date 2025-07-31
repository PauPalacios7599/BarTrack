import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const Register = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: ''
  })

  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.nombre || !form.email || !form.password) {
      setError('Todos los campos son obligatorios')
      return
    }

    try {
      await api.post('/auth/register', form)
      navigate('/')
    } catch (err) {
      console.error('Error al registrar:', err)
      setError('Error al registrar usuario')
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded shadow w-full max-w-md'>
        <h2 className='text-2xl font-bold text-sky-700 mb-6'>Registro</h2>

        {error && <p className='text-red-500 mb-4'>{error}</p>}

        <form onSubmit={handleSubmit} className='space-y-4'>
          <input
            type='text'
            name='nombre'
            placeholder='Nombre completo'
            value={form.nombre}
            onChange={handleChange}
            className='w-full border rounded px-4 py-2'
            required
          />
          <input
            type='email'
            name='email'
            placeholder='Correo electrónico'
            value={form.email}
            onChange={handleChange}
            className='w-full border rounded px-4 py-2'
            required
          />
          <input
            type='password'
            name='password'
            placeholder='Contraseña'
            value={form.password}
            onChange={handleChange}
            className='w-full border rounded px-4 py-2'
            required
          />

          <button
            type='submit'
            className='w-full bg-sky-700 text-white py-2 rounded hover:bg-sky-800'
          >
            Crear cuenta
          </button>
        </form>

        <p className='mt-4 text-center text-sm text-gray-600'>
          ¿Ya tienes una cuenta?{' '}
          <span
            className='text-sky-700 hover:underline cursor-pointer'
            onClick={() => navigate('/')}
          >
            Inicia sesión
          </span>
        </p>
      </div>
    </div>
  )
}

export default Register

