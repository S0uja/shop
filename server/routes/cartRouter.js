const Router = require('express')
const router = new Router()
const CartController = require('../controllers/cartController')
const authMiddleWare = require('../middleware/authMiddleware')
const fileMiddleware = require('../middleware/fileMiddleware')

router.post('/user', fileMiddleware.none(),authMiddleWare, CartController.createUser)
router.post('/admin', fileMiddleware.none(),CartController.createAdmin)

router.get('/admin', CartController.getAllAdmin)
router.get('/admin/:id', CartController.getOneAdmin)
router.get('/user', authMiddleWare, CartController.getAllUser)
router.get('/user/:id', authMiddleWare, CartController.getOneUser)

router.put('/user/:id', fileMiddleware.none(), authMiddleWare, CartController.updateUser)
router.put('/admin/:id', fileMiddleware.none(), CartController.updateAdmin)

router.delete('/user/:id',authMiddleWare, CartController.deleteUser)
router.delete('/admin/:id', CartController.deleteAdmin)

module.exports = router
