const knex = require("../database/knex");
const AppError = require("../Utils/AppError");

class TagsController {
    async index(request, response) {
        const { user_id } = request.params;

        const tags = await knex("movie_tags").where("user_id", user_id);

        return response.status(200).json(tags);
    }
};

module.exports = TagsController;