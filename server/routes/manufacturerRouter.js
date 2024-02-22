const Router = require('express')
const router = new Router()
const ManufacturerController = require('../controllers/manufacturerController')
const fileMiddleware = require('../middleware/fileMiddleware')

router.post('/', fileMiddleware.single('filename'), ManufacturerController.create)
router.get('/', ManufacturerController.getAll)
router.get('/:id', ManufacturerController.getOne)
router.put('/:id', fileMiddleware.single('filename'), ManufacturerController.update)
router.delete('/:id', ManufacturerController.delete)

module.exports = router
