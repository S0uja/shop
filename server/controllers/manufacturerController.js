const saveImage = require('../utils/saveImage')
const deleteImage = require('../utils/deleteImage')
const {Manufacturer} = require('../models/models')
const ApiError = require('../error/ApiError');

class ManufacturerController {
    async create(req, res, next) {
        try {
            const {name,description,contact} = req.body
            const {logo} = req.files

            const fileName = saveImage(logo)

            const result = await Manufacturer.create({
                name:name,
                logo:fileName,
                description:description,
                contact:contact
            })

            return res.json(result)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const result = await Manufacturer.findAll()
            return res.json(result)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            
            const result = await Manufacturer.findOne({where:{id:id}})

            return res.json(result)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            const {id} = req.params
            const {name,description,contact} = req.body
            const {logo} = req.files

            const tmp = await Manufacturer.findOne({where:{id:id}})
            const fileName = saveImage(logo)

            const result = await Manufacturer.update(
                {
                name:name,
                logo:fileName,
                description:description,
                contact:contact
                },
                {
                    where:{id:id},
                }
            )

            deleteImage(tmp.logo)
            
            return res.json(result)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params

            const tmp = await Manufacturer.findOne({where:{id:id}})
            const result = Manufacturer.destroy({where:{id:id}})

            deleteImage(tmp.logo)

            return res.json(result)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new ManufacturerController()
