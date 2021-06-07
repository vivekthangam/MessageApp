const Logger = require('../Utils/logger.winston')

const Apilogger = (req, res, next) => {
    Logger.info(
        `${req.method} ${req.protocol}//${req.get("host")}${req.originalUrl}`
    );
    next();
};

module.exports = Apilogger;