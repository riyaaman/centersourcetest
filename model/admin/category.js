const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        categoryName: {
            type: String,
            required: false,
        },
        subCategory: [
            {
                subCategoryName: {
                    type: String,
                    required: false,
                },
                product: [
                    {
                        productName: {
                            type: String,
                            default: false,
                        },
                        isActive: {
                            type: Boolean,
                            default: true,
                        },
                    },
                ],
                isActive: {
                    type: Boolean,
                    default: true,
                },
            },
        ],
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("categories ", categorySchema);
