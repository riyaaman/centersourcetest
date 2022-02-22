const express = require("express");

const router = express();

const categoryRoutes = require("./category");
const productRoute = require("./product");

// Set the route for category
router.use("/category", categoryRoutes);

// Set the route for product
router.use("/product", productRoute);

module.exports = router;
