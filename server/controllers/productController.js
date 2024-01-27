const saveImage = require('../utils/saveImage')
const deleteImage = require('../utils/deleteImage')
const sequelize = require('../db')
const {Product, ProductImages, Rating} = require('../models/models')
const ApiError = require('../error/ApiError')

class ProductController {
    async create(req, res, next) {
        try {
            const {name, price, amount, description, categoryId, manufacturerId,expirationdate,storageconditions,structure,weight_volume} = req.body
            const {images} = req.files

            const result = await Product.create({
                name:name,
                price:price,
                amount:amount,
                description:description,
                categoryId:categoryId,
                manufacturerId:manufacturerId,
                expirationdate:expirationdate,
                storageconditions:storageconditions,
                structure:structure,
                weight_volume:weight_volume
            });

            if(images){
                images.forEach(async (img)=>{
                    const fileName = saveImage(img)
                    await ProductImages.create({filename:fileName,productId:result.id})
                })
            }
            
            return res.json(result)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res, next) {
        try {
            let {limit,page} = req.query
            page = parseInt(page) || 1
            limit = parseInt(limit) || 5
            const offset = page * limit - limit

            const result = await Product.findAll({
                limit: limit,
                offset: offset
            },
            {
                include: [
                    ProductImages,
                    {
                        model:Rating,
                        as:'ratings',
                        attributes: [],
                    }
                ],
                attributes: {
                    include: [
                        [sequelize.fn('AVG', sequelize.col('ratings.rate')), 'avgRating'],
                    ],
                },
                group: ['product.id','product_images.id','ratings.id'],
            })

            return res.json(result)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params

            const result = await Product.findOne({
                where: {id:id},
                include: [
                    ProductImages,
                    {
                        model:Rating,
                        as:'ratings',
                        attributes: [],
                    }
                ],
                attributes: {
                    include: [
                        [sequelize.fn('AVG', sequelize.col('ratings.rate')), 'avgRating'],
                    ],
                },
                group: ['product.id','product_images.id','ratings.id'],
            })

            return res.json(result)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            const {id} = req.params
            const {name, price, amount, description, categoryId, manufacturerId,expirationdate,storageconditions,structure,weight_volume} = req.body
            const {images} = req.files

            const tmp = await ProductImages.findAll({where:{productId:id}})
            await ProductImages.destroy({where:{productId:id}})

            const result = await Product.update({
                name:name,
                price:price,
                amount:amount,
                description:description,
                categoryId:categoryId,
                manufacturerId:manufacturerId,
                expirationdate:expirationdate,
                storageconditions:storageconditions,
                structure:structure,
                weight_volume:weight_volume
            },
            {
                where:{id:id}
            });

            if(images){
                images.forEach(async (img)=>{
                    const fileName = saveImage(img)
                    await ProductImages.create({filename:fileName,productId:result.id})
                })
            }

            if(tmp){
                tmp.forEach((img)=>{
                    deleteImage(img.filename)
                })
            }
            
            return res.json(result)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params
            const tmp = await ProductImages.findOne({where:{productId:id}})
            const result = Product.destroy({where:{id:id}})
            if(tmp){
                tmp.forEach((img)=>{
                    deleteImage(img.filename)
                })
            }
            return res.json(result)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new ProductController()
