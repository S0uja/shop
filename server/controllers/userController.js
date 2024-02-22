const {
    User,
    Cart,
    Review,
    Product,
    Order,
    OrderProducts,
    OrderStatus,
    ReviewStatus,
} = require("../models/models");
const bcrypt = require("bcrypt");
const sendResponse = require("../utils/sendResponse");
const createJWT = require("../utils/createJWT");

class UserController {
    async login(req, res) {
        try {
            const { number, password } = req.body;
            const errors = [];
            const user = await User.findOne({ where: { number: number } });

            if (!user) {
                errors.push("Пользователя с таким номером не существует");
            }
            if (!number) {
                errors.push("Номер не заполнен");
            }
            if (!password) {
                errors.push("Пароль не заполнен");
            }
            if (errors.length) {
                return sendResponse(res, 400, "error", { message: errors });
            }

            const comparePassword = bcrypt.compareSync(password, user.password);
            if (!comparePassword) {
                errors.push("Указан неверный пароль");
            }
            if (errors.length) {
                return sendResponse(res, 400, "error", { message: errors });
            }

            const token = createJWT(user.id, user.fio, user.role);

            return sendResponse(res, 200, "success", { data: [token] });
        } catch (e) {
            sendResponse(res, 500, "error", {
                message: `Ошибка сервера - ${e}`,
            });
        }
    }

    async register(req, res) {
        try {
            const { number, password, fio, birthdate } = req.body;
            const errors = [];
            const contingent = await User.findOne({
                where: { number: number },
            });

            if (!number) {
                errors.push("Номер не заполнен");
            }
            if (!password) {
                errors.push("Пароль не заполнен");
            }
            if (!fio) {
                errors.push("ФИО не заполнено");
            }
            if (!birthdate) {
                errors.push("Дата рождения не заполнена");
            }
            if (contingent) {
                errors.push("Пользователь с таким номером уже существует");
            }
            if (errors.length) {
                return sendResponse(res, 400, "error", { message: errors });
            }

            const hashPassword = await bcrypt.hash(password, 5);
            const user = await User.create({
                number: number,
                password: hashPassword,
                fio: fio,
                birthdate: birthdate,
            });
            const token = createJWT(user.id, user.fio, user.role);

            return sendResponse(res, 200, "success", { data: [token] });
        } catch (e) {
            sendResponse(res, 500, "error", {
                message: `Ошибка сервера - ${e}`,
            });
        }
    }

    async check(req, res) {
        const token = createJWT(req.user.id, req.user.fio, req.user.role);

        return sendResponse(res, 200, "success", { data: [token] });
    }

    async create(req, res) {
        try {
            const { number, password, fio, birthdate, role } = req.body;
            const errors = [];
            const contingent = await User.findOne({
                where: { number: number },
            });

            if (!role) {
                errors.push("Роль не заполнена");
            }
            if (!number) {
                errors.push("Номер не заполнен");
            }
            if (!password) {
                errors.push("Пароль не заполнен");
            }
            if (!fio) {
                errors.push("ФИО не заполнено");
            }
            if (!birthdate) {
                errors.push("Дата рождения не заполнена");
            }
            if (contingent) {
                errors.push("Пользователь с таким номером уже существует");
            }
            if (errors.length) {
                return sendResponse(res, 400, "error", { message: errors });
            }

            const hashPassword = await bcrypt.hash(password, 5);
            const user = await User.create({
                number: number,
                password: hashPassword,
                fio: fio,
                birthdate: birthdate,
                role: role,
            });

            return sendResponse(res, 200, "success", { data: [user] });
        } catch (e) {
            sendResponse(res, 500, "error", {
                message: `Ошибка сервера - ${e}`,
            });
        }
    }

    async getAll(req, res) {
        try {
            const errors = [];
            const result = await User.findAll({
                attributes: [
                    "id",
                    "number",
                    "fio",
                    "birthdate",
                    "role",
                    "createdAt",
                    "updatedAt",
                ],
            });

            if (!result) {
                errors.push("Пользователи не найдены");
            }
            if (errors.length) {
                return sendResponse(res, 400, "error", { message: errors });
            }

            return sendResponse(res, 200, "success", { data: result });
        } catch (e) {
            sendResponse(res, 500, "error", {
                message: `Ошибка сервера - ${e}`,
            });
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params;
            const errors = [];
            const result = await User.findOne({
                where: {
                    id: id,
                },
                include: [
                    {
                        model: Cart,
                        include: [Product],
                    },
                    {
                        model: Order,
                        include: [
                            OrderStatus,
                            {
                                model: OrderProducts,
                                include: [Product],
                            },
                        ],
                    },
                    {
                        model: Review,
                        include: [Product, ReviewStatus],
                    },
                ],
            });

            if (!result) {
                errors.push("Пользователь не найден");
            }
            if (errors.length) {
                return sendResponse(res, 400, "error", { message: errors });
            }

            return sendResponse(res, 200, "success", { data: [result] });
        } catch (e) {
            sendResponse(res, 500, "error", {
                message: `Ошибка сервера - ${e}`,
            });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { number, password, fio, birthdate, role } = req.body;
            const contingent = await User.findOne({
                where: { number: number },
            });
            const errors = [];

            if (!number) {
                errors.push("Номер не заполнен");
            }
            if (!password) {
                errors.push("Пароль не заполнен");
            }
            if (!fio) {
                errors.push("ФИО не заполнено");
            }
            if (!birthdate) {
                errors.push("Дата рождения не заполнена");
            }
            if (!role) {
                errors.push("Роль не заполнена");
            }
            if (contingent && number != contingent.number) {
                errors.push("Пользователь с таким номером уже существует");
            }
            if (errors.length) {
                return sendResponse(res, 400, "error", { message: errors });
            }

            const hashPassword = await bcrypt.hash(password, 5);
            await User.update(
                {
                    number: number,
                    password: hashPassword,
                    fio: fio,
                    birthdate: birthdate,
                    role: role,
                },
                {
                    where: { id: id },
                }
            );

            return sendResponse(res, 200, "success", {
                data: [
                    await User.findOne({
                        where: {
                            id: id,
                        },
                        include: [
                            {
                                model: Cart,
                                include: [Product],
                            },
                            {
                                model: Order,
                                include: [
                                    OrderStatus,
                                    {
                                        model: OrderProducts,
                                        include: [Product],
                                    },
                                ],
                            },
                            {
                                model: Review,
                                include: [Product, ReviewStatus],
                            },
                        ],
                    }),
                ],
            });
        } catch (e) {
            sendResponse(res, 500, "error", {
                message: `Ошибка сервера - ${e}`,
            });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findOne({ where: { id: id } });
            const errors = [];

            if (!user) {
                errors.push("Пользователь не найден");
            }
            if (errors.length) {
                return sendResponse(res, 400, "error", { message: errors });
            }

            await Review.destroy({ where: { userId: id } });
            await Cart.destroy({ where: { userId: id } });
            await User.destroy({ where: { id: id } });

            return sendResponse(res, 200, "success");
        } catch (e) {
            sendResponse(res, 500, "error", {
                message: `Ошибка сервера - ${e}`,
            });
        }
    }
}

module.exports = new UserController();
