const Router = require('express')
const router = new Router()
const UserController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const fileMiddleware = require('../middleware/fileMiddleware')

router.post('/register',fileMiddleware.none(), UserController.register)
router.post('/login',fileMiddleware.none(), UserController.login)
router.get('/auth', authMiddleware, UserController.check)

router.post('/', fileMiddleware.none(), UserController.create)
router.get('/', UserController.getAll)
router.get('/:id', UserController.getOne)
router.put('/:id',fileMiddleware.none(), UserController.update)
router.delete('/:id', UserController.delete)

module.exports = router
