const express = require("express");
const router = express();

const { addProductDetails } = require("../../../controller/admin/product");

router.post("/addProductDetails", addProductDetails);

module.exports = router;
