const express = require('express')
const router = express.Router()
const {
  createRecount,
  getAllRecounts
} = require('../controllers/recount.controller')

const { verifyToken, isAdmin } = require('../middlewares/auth.middleware')

// Solo ADMIN puede acceder a esta sección
router.post('/', verifyToken, isAdmin, createRecount)
router.get('/', verifyToken, isAdmin, getAllRecounts)

module.exports = router
