const category = require("../../../model/admin/category");
const mongoose = require("mongoose");

const { validateAddProduct } = require("../../../validation/admin/productValidation");

// Add product details
const doAddProductDetails = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //validate incoming data
            const dataValidation = await validateAddProduct(data);
            if (dataValidation.error) {
                const message = dataValidation.error.details[0].message.replace(/"/g, "");
                return resolve({
                    status: false,
                    message: message,
                    statusCode: 400,
                });
            }

            // Destructuring the incoming data
            const { subCategoryId, productName } = data;

            // Check if sub category id exist or not
            const subCategoryDetails = await category.findOne({
                "subCategory._id": subCategoryId,
            });
            if (!subCategoryDetails) return resolve({ statusCode: 400, status: false, message: "Invalid sub category id" });

            // Check if product  name already exist or not
            const productDetails = await category.findOne({
                "subCategory._id": subCategoryId,
                "subCategory.product": { $elemMatch: { productName } },
            });
            if (productDetails) return resolve({ statusCode: 400, status: false, message: "Product name already exist" });

            // Update the product details
            category
                .updateOne(
                    {
                        "subCategory._id": mongoose.Types.ObjectId(subCategoryId),
                    },
                    {
                        $push: {
                            "subCategory.$.product": { productName },
                        },
                    }
                )
                .then((response) => {
                    return resolve({
                        status: true,
                        message: "Product created successfully",
                    });
                })
                .catch(async (error) => {
                    return resolve({ statusCode: 400, status: false, message: error });
                });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    doAddProductDetails,
};
