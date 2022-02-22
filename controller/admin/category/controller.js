const mongoose = require("mongoose");

const category = require("../../../model/admin/category");
const {
    validateAddCategory,
    validateAddSubCategory,
    validateUpdateCategory,
    validateUpdateSubCategory,
} = require("../../../validation/admin/categoryValidation");

// Add category details
const doAddCategoryDetails = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //validate incoming data
            const dataValidation = await validateAddCategory(data);
            if (dataValidation.error) {
                const message = dataValidation.error.details[0].message.replace(/"/g, "");
                return resolve({
                    status: false,
                    message: message,
                    statusCode: 400,
                });
            }

            // Check if categroy name already exist or not
            const isCategoryExist = await category.findOne({ categoryName: data.categoryName });
            if (isCategoryExist)
                return resolve({ statusCode: 400, status: false, message: "Category name already exist." });

            // Save category details into db
            let schemaObj = new category(data);
            schemaObj
                .save()
                .then(() => {
                    return resolve({ statusCode: 200, status: true, message: "Category created successfully." });
                })
                .catch(async (error) => {
                    return resolve({ statusCode: 400, status: false, message: error });
                });
        } catch (error) {
            reject(error);
        }
    });
};

// update category details
const doUpdateCategoryDetails = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //validate incoming data
            const dataValidation = await validateUpdateCategory(data);
            if (dataValidation.error) {
                const message = dataValidation.error.details[0].message.replace(/"/g, "");
                return resolve({
                    status: false,
                    message: message,
                    statusCode: 400,
                });
            }

            const { id, categoryName } = data;

            // check id exist or not
            const categoryDetails = await category.findOne({ _id: id });
            if (!categoryDetails) return resolve({ statusCode: 400, status: false, message: "category does not exist." });

            // Check if categroy name already exist or not
            const isCategoryExist = await category.findOne({ categoryName: categoryName, _id: { $ne: id } });
            if (isCategoryExist) return resolve({ statusCode: 400, status: false, message: "Category already exist." });

            category
                .updateOne({ _id: mongoose.Types.ObjectId(id) }, { categoryName })
                .then((response) => {
                    return resolve({
                        status: true,
                        message: "Category  updated successfully",
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

// Add sub catgory details
const doAddSubCategoryDetails = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //validate incoming data
            const dataValidation = await validateAddSubCategory(data);
            if (dataValidation.error) {
                const message = dataValidation.error.details[0].message.replace(/"/g, "");
                return resolve({
                    status: false,
                    message: message,
                    statusCode: 400,
                });
            }

            const { categoryId, subCategoryName } = data;

            // check if category exist or not
            const categoryDetails = await category.findOne({ _id: categoryId });
            if (!categoryDetails) return resolve({ statusCode: 400, status: false, message: "Invalid category id" });

            // check if sub category already exist or not
            const isSubCategoryExist = await category.findOne({
                _id: categoryId,
                "subCategory.subCategoryName": subCategoryName,
            });

            if (isSubCategoryExist)
                return resolve({ statusCode: 400, status: false, message: "Sub category already exist." });

            // sub category details is push into db
            category
                .updateOne(
                    { _id: mongoose.Types.ObjectId(categoryId) },
                    {
                        $push: {
                            subCategory: { subCategoryName },
                        },
                    }
                )
                .then((response) => {
                    return resolve({
                        status: true,
                        message: "Sub category created successfully",
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

// update subcategory details
const doUpdateSubCategoryDetails = (data, user) => {
    return new Promise(async (resolve, reject) => {
        try {
            //validate incoming data
            const dataValidation = await validateUpdateSubCategory(data);
            if (dataValidation.error) {
                const message = dataValidation.error.details[0].message.replace(/"/g, "");
                return resolve({
                    status: false,
                    message: message,
                    statusCode: 400,
                });
            }

            const { id, subCategoryName } = data;

            // check the sub category id is valid or not
            let subcategoryDetails = await category.findOne({
                "subCategory._id": id,
            });
            if (!subcategoryDetails) return resolve({ statusCode: 400, status: false, message: "Invalid id " });

            // check the sub categroy already exist or not
            var index = subcategoryDetails.subCategory.findIndex(
                (e) => e.subCategoryName == subCategoryName && e._id != id + ""
            );
            if (index != -1) return resolve({ statusCode: 400, status: false, message: "Sub categroy already exist." });

            // update the sub category details
            category
                .updateOne(
                    { "subCategory._id": mongoose.Types.ObjectId(id) },
                    {
                        $set: {
                            "subCategory.$.subCategoryName": subCategoryName,
                        },
                    }
                )
                .then((response) => {
                    return resolve({
                        status: true,
                        message: "Sub category updated successfully",
                    });
                });
        } catch (error) {
            reject(error);
        }
    });
};

// Get category details
const doGetCategories = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const categories = await category.find({}, { __v: 0 });
            return resolve({
                statusCode: 400,
                status: false,
                message: "Success",
                data: { categories },
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    doAddCategoryDetails,
    doUpdateCategoryDetails,
    doAddSubCategoryDetails,
    doUpdateSubCategoryDetails,
    doGetCategories,
};
