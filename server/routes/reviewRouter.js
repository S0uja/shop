const Router = require('express')
const router = new Router()
const ReviewController = require('../controllers/reviewController')
const authMiddleWare = require('../middleware/authMiddleware')

router.post('/admin', authMiddleWare, ReviewController.createAdmin)
router.post('/user', authMiddleWare, ReviewController.createUser)

router.get('/admin', ReviewController.getAllAdmin)
router.get('/admin/:id', ReviewController.getOneAdmin)
router.get('/user', ReviewController.getAllUser)
router.get('/user/:id', ReviewController.getOneUser)

router.put('/admin/:id', ReviewController.updateAdmin)
router.put('/user/:id', ReviewController.updateUser)

router.delete('/admin/:id', ReviewController.deleteAdmin)
router.delete('/user/:id', ReviewController.deleteUser)

module.exports = router
