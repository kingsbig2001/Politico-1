import appRoot from 'app-root-path';
import winston from 'winston';

const tsFormat = () => (new Date()).toLocaleTimeString();
const options = {
  file: {
    timestamp: tsFormat,
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false,
});

logger.stream = {
  write(message, encoding) {
    logger.info(message, encoding);
  },
};
export default logger;
