const Router = require('express')
const router = new Router()
const OrderController = require('../controllers/orderController')
const authMiddleWare = require('../middleware/authMiddleware')

router.post('/', authMiddleWare, OrderController.create)
router.get('/', OrderController.getAll)
router.get('/:id', OrderController.getOne)
router.put('/:id', OrderController.update)
router.delete('/:id', OrderController.delete)

module.exports = router
