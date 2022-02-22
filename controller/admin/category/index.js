const {
    doAddCategoryDetails,
    doUpdateCategoryDetails,
    doAddSubCategoryDetails,
    doUpdateSubCategoryDetails,
    doGetCategories,
} = require("./controller");

// Add category details
const addCategoryDetails = (req, res, next) => {
    doAddCategoryDetails(req.body)
        .then(({ statusCode = 200, message, status }) => {
            res.status(statusCode).json({
                message,
                status,
            });
        })
        .catch((error) => {
            next(error);
        });
};

// update  category
const updateCategoryDetails = (req, res, next) => {
    doUpdateCategoryDetails(req.body)
        .then(({ statusCode = 200, message, status }) => {
            res.status(statusCode).json({
                message,
                status,
            });
        })
        .catch((error) => {
            next(error);
        });
};


// Add sub category under main category
const addSubCategoryDetails = (req, res, next) => {
    doAddSubCategoryDetails(req.body)
        .then(({ statusCode = 200, message, status }) => {
            res.status(statusCode).json({
                message,
                status,
            });
        })
        .catch((error) => {
            next(error);
        });
};

// update sub category
const updateSubCategoryDetails = (req, res, next) => {
    doUpdateSubCategoryDetails(req.body)
        .then(({ statusCode = 200, message, status }) => {
            res.status(statusCode).json({
                message,
                status,
            });
        })
        .catch((error) => {
            next(error);
        });
};

// Get category details
const getCategories = (req, res, next) => {
    doGetCategories(req.body)
        .then(({ statusCode = 200, message, status, data }) => {
            res.status(statusCode).json({
                message,
                status,
                ...(data && { data }),
            });
        })
        .catch((error) => {
            next(error);
        });
};

module.exports = {
    addCategoryDetails,
    updateCategoryDetails,
    addSubCategoryDetails,
    updateSubCategoryDetails,
    getCategories,
};
