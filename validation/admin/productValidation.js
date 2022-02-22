const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const validateAddProduct = (data) => {
    const Schema = Joi.object({
        productName: Joi.string().required().label("productName"),
        subCategoryId: Joi.string().required().label("subCategoryId"),
    });
    return Schema.validate(data);
};

module.exports = {
    validateAddProduct,
};
