const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const app = express();

const adminRoutes = require("./routes/admin");
const globalErrorHandler = require("./error/globalErrorHandler");

app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
// Set security HTTP headers
app.use(helmet());
// Data sanitization against No SQL query injection
app.use(mongoSanitize());

//routes setting
app.use("/api/admin", adminRoutes);

//checking if route is valid or not
app.use("*", (req, res) => {
    res.status(500).json({
        status: false,
        message: "Undefined route.",
    });
});

//global error handler
app.use(globalErrorHandler);

// connect to database
const PORT = process.env.PORT || 6000;
mongoose
    .connect(process.env.DB_CONNECTION_URI_SERVER, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((_) => {
        app.listen(PORT, () => console.log(`server started at http://localhost:${PORT}`));
    })
    .catch((error) => {
        console.log(error);
    });

//un handled rejections
process.on("unhandledRejection", (error) => {
    console.log("UNHANDLED REJECTION!!!  shutting down ...");
    console.log(error.name, error.message);
});
