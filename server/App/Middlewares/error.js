const ErrorRespone = require("../Utils/errorResponse");
const Logger = require('../Utils/logger.winston')

const errorHandler = (err, req, res, next) => {
    //copy error message
    let error = {...err };
    let message;


    error.message = err.message;

    //Mongoose bad object id
    if (err.name === "CastError") {
        message = `id ${err.value}  is not available at the moment`;
        error = new ErrorRespone(message, 404);
    }


    if (err.code === 11000) {
        message = "Duplicate field value enterd";
        error = new ErrorRespone(message, 400)
    }
    if (err.name === "ValidationError") {
        message = Object.values(err.errors).map(val => val.message);
        error = new ErrorRespone(message, 400)
    }

    if (process.env.DEBUG) {

        Logger.error(
            `Err.stack: ${err.stack}`
        );
        Logger.error(
            `Err.message: ${err.message}`
        );
    }

    res.status(err.statusCode || 500).json({
        sucess: false,
        error: error.message || "server error",
        errorname: err.name,
        errcode: err.code
    });
};

module.exports = errorHandler;