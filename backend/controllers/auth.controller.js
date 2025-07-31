const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Registro
const register = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body

    const userExistente = await User.findOne({ email })
    if (userExistente) {
      return res.status(400).json({ message: 'El usuario ya existe' })
    }

    const hash = await bcrypt.hash(password, 10)

    const nuevoUsuario = new User({
      nombre,
      email,
      password: hash,
      rol: rol || 'empleado'
    })

    await nuevoUsuario.save()
    res.status(201).json({ message: 'Usuario creado correctamente' })
  } catch (error) {
    console.error('❌ Error al registrar usuario:', error)
    res.status(500).json({ message: 'Error al registrar usuario' })
  }
}

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const usuario = await User.findOne({ email })
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    const isMatch = await bcrypt.compare(password, usuario.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' })
    }

    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    })
  } catch (error) {
    console.error('❌ Error en login:', error)
    res.status(500).json({ message: 'Error al hacer login' })
  }
}

module.exports = {
  register,
  login
}
