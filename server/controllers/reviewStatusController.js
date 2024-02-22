const { ReviewStatus } = require("../models/models");
const sendResponse = require("../utils/sendResponse");

class ReviewStatusController {
    async create(req, res) {
        try {
            const { name } = req.body;
            const result = await ReviewStatus.create({ name: name });
            const errors = [];

            if (!name) {
                errors.push("Название не заполнено");
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

    async getAll(req, res) {
        try {
            const result = await ReviewStatus.findAll();
            const errors = [];

            if (!result) {
                errors.push("Статусы отзывов не найдены");
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
            const result = await ReviewStatus.findOne({ where: { id: id } });
            const errors = [];

            if (!result) {
                errors.push("Статус отзыва не найден");
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
            const { name } = req.body;
            const errors = [];

            if (!name) {
                errors.push("Название не заполнено");
            }
            if (errors.length) {
                return sendResponse(res, 400, "error", { message: errors });
            }

            const result = await ReviewStatus.update(
                { name: name },
                { where: { id: id } }
            );

            return sendResponse(res, 200, "success", {
                data: [await ReviewStatus.findOne({ where: { id: id } })],
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
            const result = await ReviewStatus.destroy({ where: { id: id } });
            const errors = [];

            if (!result) {
                errors.push("Статус отзыва не найден");
            }
            if (errors.length) {
                return sendResponse(res, 400, "error", { message: errors });
            }

            return sendResponse(res, 200, "success");
        } catch (e) {
            sendResponse(res, 500, "error", {
                message: `Ошибка сервера - ${e}`,
            });
        }
    }
}

module.exports = new ReviewStatusController();
