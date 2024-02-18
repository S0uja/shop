const Router = require('express')
const router = new Router()
const OrderStatusController = require('../controllers/orderStatusController')

router.post('/', OrderStatusController.create)
router.get('/', OrderStatusController.getAll)
router.get('/:id', OrderStatusController.getOne)
router.put('/:id', OrderStatusController.update)
router.delete('/:id', OrderStatusController.delete)

module.exports = router
