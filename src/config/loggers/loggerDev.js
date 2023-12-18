import { addColors, createLogger, format, transports} from "winston"

const {simple,colorize}= format

const levels = {
    
    HTTP:0,
    FATAL:2,
    ERROR:3,
    WARN:2,
    INFO:3,
    DEBUG:5
}

const colors = {
    
    HTTP: "blue",
    ERROR:"white",
    FATAL: "cyan",
    WARN: "yellow",
    INFO: "green",
    DEBUG: "red"
}
addColors(colors)

export default createLogger({
    levels, 
    format:colorize(),
    transports: [
        new transports.Console({
                level: "DEBUG",
                format: simple()
            })
    ]
})