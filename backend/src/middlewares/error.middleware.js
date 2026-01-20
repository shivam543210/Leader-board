import {Logger} from "../config/logger.js";

 const errorhandler = (err, req, res, next) => {
  Logger.error({
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.url,
  });

  const statusCode = err.statusCode || 500;
  const isProd = process.env.NODE_ENV === "production";

  res.status(statusCode).json({
    status: "error",
    message:
      isProd && statusCode === 500
        ? "Internal Server Error"
        : err.message,
  });
};

export  {errorhandler}