const {User, Cart, Rating} = require('../models/models')
const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const createJWT = require('../utils/createJWT')

class UserController {
    async login(req, res, next) {
        try {
            const {number,password} = req.body

            const user = await User.findOne({where:{number:number}})
            if (!user) {
                return next(ApiError.badRequest('Пользователя с таким номером не существует'))
            }

            const comparePassword = bcrypt.compareSync(password, user.password)
            if(!comparePassword){
                return next(ApiError.badRequest('Указан неверный пароль'))
            }

            const token = createJWT(user.id,user.fio,user.role)

            return res.json({token})
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async register(req, res, next) {
        try {
            const {number,password,fio,birthdate} = req.body

            const contingent = await User.findOne({where:{number:number}})
            if (contingent) {
                return next(ApiError.badRequest('Пользователь с таким номером уже существует'))
            }

            const hashPassword = await bcrypt.hash(password, 5)

            const result = await User.create({
                number:number,
                password:hashPassword,
                fio:fio,
                birthdate:birthdate
            })

            const token = createJWT(result.id,result.fio,result.role)

            return res.json({token})
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async check(req, res, next) {
        const token = createJWT(req.user.id,req.user.fio,req.user.role)

        return res.json({token})
    }

    async getAll(req, res, next) {
        try {
            const result = await User.findAll()

            return res.json(result)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params

            const result = await User.findOne({
                where:{
                    id:id
                },
                include:[
                    Cart,
                    Rating
                ]
            })

            return res.json(result)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            const {id} = req.params
            const {number,password,fio,birthdate,role} = req.body

            const contingent = await User.findOne({where:{number:number}})
            if (contingent && number != contingent.number) {
                return next(ApiError.badRequest('Пользователь с таким номером уже существует'))
            }

            const hashPassword = await bcrypt.hash(password, 5)

            const result = await User.update({
                number:number,
                password:hashPassword,
                fio:fio,
                birthdate:birthdate,
                role:role
            },{
                where:{id:id}
            })

            return res.json(result)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params

            const result = await User.destroy({where:{id:id}})
            
            await Rating.destroy({where:{userId:id}})
            await Cart.destroy({where:{userId:id}})

            return res.json(result)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new UserController();