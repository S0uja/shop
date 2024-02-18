const Router = require('express')
const router = new Router()
const CartController = require('../controllers/cartController')
const authMiddleWare = require('../middleware/authMiddleware')

router.post('/', authMiddleWare, CartController.create)
router.get('/', CartController.getAll)
router.get('/:id', CartController.getOne)
router.put('/:id', CartController.update)
router.delete('/:id', CartController.delete)

module.exports = router
