const Router = require('express')
const router = new Router()
const ReviewStatusController = require('../controllers/reviewStatusController')

router.post('/', ReviewStatusController.create)
router.get('/', ReviewStatusController.getAll)
router.get('/:id', ReviewStatusController.getOne)
router.put('/:id', ReviewStatusController.update)
router.delete('/:id', ReviewStatusController.delete)

module.exports = router
