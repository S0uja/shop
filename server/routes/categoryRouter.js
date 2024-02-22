const Router = require('express')
const router = new Router()
const CategoryController = require('../controllers/categoryController')
const fileMiddleware = require('../middleware/fileMiddleware')

router.post('/', fileMiddleware.single('filename'),CategoryController.create)
router.get('/', CategoryController.getAll)
router.get('/:id', CategoryController.getOne)
router.put('/:id', fileMiddleware.single('filename'), CategoryController.update)
router.delete('/:id', CategoryController.delete)

module.exports = router
