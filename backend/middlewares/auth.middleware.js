const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Acceso denegado. Token no proporcionado.' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ message: 'Token inválido o expirado' })
  }
}

// Middleware solo para ADMIN
const isAdmin = (req, res, next) => {
  if (req.user?.rol !== 'admin') {
    return res
      .status(403)
      .json({ message: 'Acceso restringido a administradores' })
  }
  next()
}

// Middleware solo para EMPLEADO
const isEmpleado = (req, res, next) => {
  if (req.user?.rol !== 'empleado') {
    return res.status(403).json({ message: 'Acceso restringido a empleados' })
  }
  next()
}

module.exports = {
  verifyToken,
  isAdmin,
  isEmpleado
}
