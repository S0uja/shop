const {Review} = require('../models/models')
const ApiError = require('../error/ApiError');

class ReviewController {
    async create(req, res, next) {
        try {
            const {productId,text,rate,userId} = req.body
            const id = userId || req.user.id

            const result = await Review.create({productId:productId,text:text,rate:rate,userId:id,reviewStatusId:1})

            return res.json(result)
        } 
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const result = await Review.findAll()

            return res.json(result)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params

            const result = await Review.findOne({where:{id:id}})

            return res.json(result)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            const {id} = req.params
            const {productId,text,rate,reviewStatusId} = req.body

            const result = await Review.update({productId:productId,text:text,rate:rate,reviewStatusId:reviewStatusId},{where:{id:id}})

            return res.json(result)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params

            const result = await Review.destroy({where:{id:id}})

            return res.json(result)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new ReviewController()
