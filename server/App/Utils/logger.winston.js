const winston = require('winston');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `[${label}] ${timestamp} [${level}]: ${message}`;
});
const logger = winston.createLogger({
    format: combine(
        label({ label: 'API' }),
        timestamp(),
        myFormat
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'server.log' })
    ]
});


module.exports = logger;