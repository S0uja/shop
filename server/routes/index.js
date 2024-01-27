const Router = require('express')
const router = new Router()
const productRouter = require('./productRouter')
const categoryRouter = require('./categoryRouter')
const manufacturerRouter = require('./manufacturerRouter')

router.use('/category', categoryRouter)
router.use('/product', productRouter)
router.use('/manufacturer', manufacturerRouter)

module.exports = router
