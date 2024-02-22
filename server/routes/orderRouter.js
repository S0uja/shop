const Router = require('express')
const router = new Router()
const OrderController = require('../controllers/orderController')
const authMiddleWare = require('../middleware/authMiddleware')
const fileMiddleware = require('../middleware/fileMiddleware')

router.post('/user', fileMiddleware.none(),authMiddleWare, OrderController.createUser)
router.post('/admin', fileMiddleware.none(),OrderController.createAdmin)

router.get('/admin', OrderController.getAllAdmin)
router.get('/admin/:id', OrderController.getOneAdmin)
router.get('/user', authMiddleWare, OrderController.getAllUser)
router.get('/user/:id', authMiddleWare, OrderController.getOneUser)

router.put('admin/:id', fileMiddleware.none(), OrderController.update)

router.delete('admin/:id', OrderController.delete)

module.exports = router
