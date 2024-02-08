const Router = require('express')
const router = new Router()
const productRouter = require('./productRouter')
const categoryRouter = require('./categoryRouter')
const manufacturerRouter = require('./manufacturerRouter')
const userRouter = require('./userRouter')

router.use('/category', categoryRouter)
router.use('/product', productRouter)
router.use('/manufacturer', manufacturerRouter)
router.use('/user' , userRouter)

module.exports = router
