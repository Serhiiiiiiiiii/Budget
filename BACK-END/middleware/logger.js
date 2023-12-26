const winston = require("winston");
const { createLogger, format, transports } = winston;

function userLoggerMiddleware(req, res, next) {
  const userID = req.userID; // User ID for logging actions

  const userTransport = new winston.transports.File({
    filename: `logs/${userID}.log`,
    format: format.combine(
      format.timestamp({ format: "YYYY-MM-DD" }),
      format.printf((info) => `${info.timestamp} ${info.message}`)
    ),
  });

  const logger = createLogger({
    transports: [userTransport],
  });

  req.logger = logger;

  next();
}

function signupLoggerMiddleware(req, res, next) {
  const newUserID = req._id; // User ID for new registered users
  console.log(newUserID)

  const signupTransport = new winston.transports.File({
    filename: `logs/${newUserID}.log`,
    format: format.combine(
      format.timestamp({ format: "YYYY-MM-DD" }),
      format.printf((info) => `${info.timestamp} ${info.message}`)
    ),
  });

  const signupLogger = createLogger({
    transports: [signupTransport],
  });

  req.signupLogger = signupLogger;
  signupLogger.info("The user has been registered");

  next();
}

function loginLoggerMiddleware(req, res, next) {
  const userID = req._id;
  
  const loginTransport = new winston.transports.File({
    filename: `logs/${userID}.log`,
    format: format.combine(
      format.timestamp({ format: "YYYY-MM-DD" }),
      format.printf((info) => `${info.timestamp} ${info.message}`)
    ),
  });

  const loginLogger = createLogger({
    transports: [loginTransport],
  });

  req.loginLogger = loginLogger;
  loginLogger.info("The user is logged in")

  next();
}

function logoutLoggerMiddleware(req, res, next) {
  const userID = req.userID;

  const logoutTransport = new winston.transports.File({
    filename: `logs/${userID}.log`,
    format: format.combine(
      format.timestamp({ format: "YYYY-MM-DD" }),
      format.printf((info) => `${info.timestamp} ${info.message}`)
    ),
  });

  const logoutLogger = createLogger({
    transports: [logoutTransport],
  });

  req.logoutLogger = logoutLogger;
  logoutLogger.info("The user is logged out")

  next();
}

module.exports = {
  userLoggerMiddleware,
  signupLoggerMiddleware,
  loginLoggerMiddleware,
  logoutLoggerMiddleware
};
