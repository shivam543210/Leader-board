import winston from "winston";

const Logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
        winston.format.errors({stack:true}),
        winston.format.json()
    ),
    transports: [
        //error logs
        new winston.transports.File({
            filename: "logs/error.log",
            level: "error"
        }),
        //combined logs
        new winston.transports.File({
            filename: "logs/combined.log"
        }),
        //console logs
        new winston.transports.Console()
    ]

})

export  {Logger}
