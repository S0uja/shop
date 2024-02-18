const {Order,OrderProducts, OrderStatus} = require('../models/models')
const ApiError = require('../error/ApiError');

class OrderController {
    async create(req, res, next) {
        try {
            const {address,products,price,userId} = req.body
            const id = userId || req.user.id

            if(!products){
                return res.json("В заказе нет продуктов")
            }

            const result = await Order.create({userId:id,address:address,price:price,orderStatusId:1})

            for(const product of products){
                await OrderProducts.create({orderId:result.id,productId:product.id,count:product.count})
            }
            
            return res.json(await Order.findOne({where:{id:result.id},include:[OrderProducts,OrderStatus]}))
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const result = await Order.findAll({include:[OrderProducts,OrderStatus]})

            return res.json(result)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params

            const result = await Order.findAll({where:{id:id},include:[OrderProducts,OrderStatus]})

            return res.json(result)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            
            const {address,products,price,userId,orderStatusId} = req.body
            const {id} = req.params
            
            const result = await Order.update({address:address,price:price,userId:userId,orderStatusId:orderStatusId},{where:{id:id}})
            await OrderProducts.destroy({where:{orderId:id}})

            for (const product of products) {
                await OrderProducts.create({orderId:result.id,productId:product.id,count:product.count})
            }

            return res.json(result)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params

            const result = await Order.destroy({where:{id:id}})
            await OrderProducts.destroy({where:{orderId:id}})

            return res.json(result)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new OrderController()