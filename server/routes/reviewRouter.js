const Router = require('express')
const router = new Router()
const ReviewController = require('../controllers/reviewController')
const authMiddleWare = require('../middleware/authMiddleware')

router.post('/admin', authMiddleWare, ReviewController.create)
router.post('/user', authMiddleWare, ReviewController.create)

router.get('/admin', ReviewController.getAll)
router.get('/admin/:id', ReviewController.getOne)
router.get('/user', ReviewController.getAll)
router.get('/user/:id', ReviewController.getOne)

router.put('/admin/:id', ReviewController.update)
router.put('/user/:id', ReviewController.update)

router.delete('/admin/:id', ReviewController.delete)
router.delete('/user/:id', ReviewController.delete)

module.exports = router
