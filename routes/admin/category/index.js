const express = require("express");
const router = express();

const {
    addCategoryDetails,
    getCategories,
    addSubCategoryDetails,
    updateCategoryDetails,
    updateSubCategoryDetails,
} = require("../../../controller/admin/category");

// ------------------  Category Apis ---------------------------/
router.post("/addCategoryDetails", addCategoryDetails);
router.post("/updateCategoryDetails", updateCategoryDetails);

// ------------------ Sub category Apis---------------------------//
router.post("/addSubCategoryDetails", addSubCategoryDetails);
router.post("/updateSubCategoryDetails", updateSubCategoryDetails);

router.get("/getCategories", getCategories);

module.exports = router;
