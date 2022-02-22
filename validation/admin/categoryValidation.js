const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const validateAddCategory = (data) => {
    const Schema = Joi.object({
        categoryName: Joi.string().required().min(3).label("categoryName"),
    });
    return Schema.validate(data);
};

const validateUpdateCategory = (data) => {
    const Schema = Joi.object({
        id: Joi.objectId().required().label("id").messages({ "string.pattern.name": "Invalid id." }),
        categoryName: Joi.string().required().min(3).label("categoryName"),
    });
    return Schema.validate(data);
};

const validateAddSubCategory = (data) => {
    const Schema = Joi.object({
        categoryId: Joi.objectId()
            .required()
            .label("categoryId")
            .messages({ "string.pattern.name": "Invalid category id." }),
        subCategoryName: Joi.string().required().min(3).label("subCategoryName"),
    });
    return Schema.validate(data);
};

const validateUpdateSubCategory = (data) => {
    const Schema = Joi.object({
        id: Joi.objectId().required().label("id").messages({ "string.pattern.name": "Invalid id." }),
        subCategoryName: Joi.string().required().label("subCategoryName"),
    });
    return Schema.validate(data);
};

module.exports = {
    validateAddCategory,
    validateAddSubCategory,
    validateUpdateCategory,
    validateUpdateSubCategory,
};
