const pino = require('pino');
const pinoHttp = require('pino-http');

const isDev = process.env.NODE_ENV !== 'production';

let logger;

if (isDev) {
  // Use pino.transport when available (pino >=7) to run pino-pretty
  // If you installed pino-pretty globally or as devDependency, this will work.
  try {
    logger = pino({
      level: process.env.LOG_LEVEL || 'debug',
    }, pino.transport && pino.transport({
      target: 'pino-pretty',
      options: { colorize: true, translateTime: 'yyyy-mm-dd HH:MM:ss.l' }
    }) || undefined);
  } catch (e) {
    // Fallback for older pino versions or transport failures:
    logger = pino({
      level: process.env.LOG_LEVEL || 'debug',
      prettifier: require('pino-pretty'),
      prettyPrint: { colorize: true, translateTime: 'yyyy-mm-dd HH:MM:ss.l' }
    });
  }
} else {
  // Production: JSON logs, minimal overhead
  logger = pino({
    level: process.env.LOG_LEVEL || 'info'
  });
}

// pino-http middleware for express apps (request logging)
const httpLogger = pinoHttp({
  logger,
  customLogLevel: function (res, err) {
    if (res.statusCode >= 500 || err) return 'error';
    if (res.statusCode >= 400) return 'warn';
    return 'info';
  },
  serializers: {
    req: (req) => ({
      method: req.method,
      url: req.url,
      params: req.params,
      query: req.query
    }),
    res: pino.stdSerializers.res
  }
});

module.exports = {
  logger,
  httpLogger
};