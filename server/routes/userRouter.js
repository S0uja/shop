const Router = require('express')
const router = new Router()
const UserController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/auth', authMiddleware, UserController.check)
router.get('/', UserController.getAll)
router.get('/:id', UserController.getOne)
router.put('/:id', UserController.update)
router.delete('/:id', UserController.delete)

module.exports = router
