const Router = require('express')
const router = new Router()
const UserController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const fileMiddleware = require('../middleware/fileMiddleware')

router.post('/register',fileMiddleware.none(), UserController.register)
router.post('/login',fileMiddleware.none(), UserController.login)
router.get('/auth', authMiddleware, UserController.check)
router.put('/update/password',authMiddleware,fileMiddleware.none(), UserController.updatePasswordUser)
router.put('/update',authMiddleware,fileMiddleware.none(), UserController.updateUser)


router.post('/admin/', fileMiddleware.none(), UserController.create)
router.get('/admin/', UserController.getAll)
router.get('/admin/:id', UserController.getOne)
router.put('/admin/:id',fileMiddleware.none(), UserController.updateAdmin)

router.delete('/admin/:id', UserController.delete)

module.exports = router
