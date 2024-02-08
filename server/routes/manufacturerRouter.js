const Router = require('express')
const router = new Router()
const ManufacturerController = require('../controllers/manufacturerController')

router.post('/', ManufacturerController.create)
router.get('/', ManufacturerController.getAll)
router.get('/:id', ManufacturerController.getOne)
router.put('/:id', ManufacturerController.update)
router.delete('/:id', ManufacturerController.delete)

module.exports = router
