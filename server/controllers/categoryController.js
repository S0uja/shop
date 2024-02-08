const saveImage = require('../utils/saveImage')
const deleteImage = require('../utils/deleteImage')
const {Category} = require('../models/models')
const ApiError = require('../error/ApiError');

class CategoryController {
    async create(req, res, next) {
        try {
            const {parentId,name} = req.body
            const {img} = req.files

            const fileName = saveImage(img)
            
            const result = await Category.create({parentId,name,img:fileName})
            return res.json(result)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const result = await Category.findAll()
            return res.json(result)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const result = await Category.findOne({where:id})
            return res.json(result)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            const {id} = req.params
            const {parentId,name} = req.body
            const {img} = req.files

            const tmp = await Category.findOne({where:{id:id}})
            const fileName = saveImage(img)

            const result = await Category.update(
                {
                    parentId:parentId,
                    name:name,
                    img:fileName,
                },
                {
                    where:{
                        id:id
                    }
                }
            )

            deleteImage(tmp.img)

            return(res.json(result))
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params
            const tmp = await Category.findOne({where:{id:id}})

            const result = await Category.destroy({
                where:{
                    id:id
                }
            })
            deleteImage(tmp.img)
            
            return res.json(result)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new CategoryController()
