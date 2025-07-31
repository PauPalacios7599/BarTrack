import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const login = async (credentials) => {
  try {
    const response = await instance.post('/auth/login', credentials)
    return response.data
  } catch (error) {
    throw error.response?.data?.message || 'Error al iniciar sesión'
  }
}

export default instance
