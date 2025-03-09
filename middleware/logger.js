import fs from "fs";
import path from "path";
import morgan from "morgan";
import { createLogger, format, transports } from "winston";

// إنشاء مجلد `logs` إذا لم يكن موجودًا
const logDirectory = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

// إعداد Morgan لتسجيل الطلبات في ملف بتنسيق JSON
const accessLogStream = fs.createWriteStream(path.join(logDirectory, "access.log"), { flags: "a" });
const morganMiddleware = morgan((tokens, req, res) => {
    return JSON.stringify({
        method: tokens.method(req, res),
        url: tokens.url(req, res),
        status: tokens.status(req, res),
        responseTime: tokens['response-time'](req, res),
        date: tokens.date(req, res),
    });
}, { stream: accessLogStream });

// إعداد Winston لتسجيل الأخطاء بتنسيق JSON
const logger = createLogger({
    level: "info",
    format: format.combine(
        format.timestamp(),
        format.json() // تنسيق السجل بشكل JSON
    ),
    transports: [
        new transports.Console(), // طباعة السجلات في الكونسول
        new transports.File({ filename: path.join(logDirectory, "errors.log"), level: "error" }) // تخزين الأخطاء
    ]
});

export { morganMiddleware, logger };
