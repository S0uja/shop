const Router = require('express')
const router = new Router()
const ProductController = require('../controllers/productController')
const fileMiddleware = require('../middleware/fileMiddleware')

router.post('/', fileMiddleware.array('images'), ProductController.create)
router.get('/', ProductController.getAll)
router.get('/:id', ProductController.getOne)
router.put('/:id', fileMiddleware.array('images'), ProductController.update)
router.delete('/:id', ProductController.delete)

module.exports = router
