const saveImage = require('../utils/saveImage')
const deleteImage = require('../utils/deleteImage')
const sequelize = require('../db')
const {Product, ProductImages, Review, OrderProducts} = require('../models/models')
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
            
            
            return res.json(await Product.findOne({where:{id:result.id},include:[ProductImages]}))
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res, next) {
        try {
            let {limit,page,sort,sortmode} = req.query

            sort = sort || 'updateAt'
            sortmode = sortmode || 'asc'
            page = parseInt(page) || 1
            limit = parseInt(limit) || 5

            const offset = page * limit - limit

            const result = await Product.findAll({
                include: [
                    ProductImages,
                    {
                        model: Review,
                        attributes: []
                    },
                    {
                        model: OrderProducts,
                        attributes: []
                    }
                ],
                attributes: {
                    include: [
                        [sequelize.literal('(SELECT AVG(rate) FROM reviews WHERE reviews.productId = product.id)'), 'avgReview'],
                        [sequelize.literal('(SELECT COUNT(*) FROM order_products WHERE order_products.productId = product.id)'), 'orders']
                    ],
                },
                order: [[sort, sortmode]],
                limit: limit,
                offset: offset
            });

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
                    Review,
                    {
                        model:OrderProducts,
                        attributes:[]
                    }
                ],
                attributes: {
                    include: [
                        [sequelize.fn('AVG', sequelize.col('reviews.rate')), 'avgReview'],
                        [sequelize.fn('COUNT', sequelize.col('order_products.id')), 'orders'],
                    ],
                },
                group: ['product.id','product_images.id','reviews.id'],
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
                    await ProductImages.create({filename:fileName,productId:id})
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
            const tmp = await ProductImages.findAll({where:{productId:id}})
            const result = await Product.destroy({where:{id:id}})
            if(tmp){
                tmp.forEach((img)=>{
                    ProductImages.destroy({where:{id:img.id}})
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
