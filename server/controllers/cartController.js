const {Cart} = require('../models/models')
const ApiError = require('../error/ApiError');

class CartController {
    async create(req, res, next) {
        try {
            const {productId,count,userId} = req.body
            const id = userId || req.user.id

            const result = await Cart.create({userId:id,productId:productId,count:count})
            
            return res.json(result)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const result = await Cart.findAll()

            return res.json(result)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params

            const result = await Cart.findOne({where:{id:id}})

            return res.json(result)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            const {id} = req.params
            const {productId,count} = req.body
            const result = await Cart.update({productId:productId,count:count},{where:{id:id}})
            
            return res.json(result)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params

            const result = await Cart.destroy({where:{id:id}})

            return res.json(result)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new CartController()
