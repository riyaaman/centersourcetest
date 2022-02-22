const { doAddProductDetails } = require("./controller");

const addProductDetails = (req, res, next) => {
    doAddProductDetails(req.body)
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

module.exports = {
    addProductDetails,
};
