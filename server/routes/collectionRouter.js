const Router = require('express')
const router = new Router()
const CollectionController = require('../controllers/collectionController')
const fileMiddleware = require('../middleware/fileMiddleware')

router.post('/', fileMiddleware.single('filename'),CollectionController.create)
router.get('/', CollectionController.getAll)
router.get('/:id', CollectionController.getOne)
router.put('/:id', fileMiddleware.single('filename'), CollectionController.update)
router.delete('/:id', CollectionController.delete)

module.exports = router
