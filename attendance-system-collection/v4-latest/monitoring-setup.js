// server/config/logger.js
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

export default logger;

// server/middleware/errorLogger.js
import logger from '../config/logger.js';

export const errorLogger = (err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    ip: req.ip
  });
  next(err);
};

// Add to server.js
import { errorLogger } from './middleware/errorLogger.js';
app.use(errorLogger);

// server/middleware/requestLogger.js
import logger from '../config/logger.js';

export const requestLogger = (req, res, next) => {
  logger.info({
    path: req.path,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('user-agent')
  });
  next();
};
