const {OrderStatus} = require('../models/models')
const ApiError = require('../error/ApiError');

class OrderStatusController {
    async create(req, res, next) {
        try {
            const {name} = req.body

            const result = await OrderStatus.create({name:name})
            
            return res.json(result)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const result = await OrderStatus.findAll()

            return res.json(result)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params

            const result = await OrderStatus.findOne({where:{id:id}})

            return res.json(result)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            const {id} = req.params
            const {name} = req.body
            
            const result = await OrderStatus.update({name:name},{where:{id:id}})
            
            return res.json(result)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params

            const result = await OrderStatus.destroy({where:{id:id}})

            return res.json(result)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new OrderStatusController()
