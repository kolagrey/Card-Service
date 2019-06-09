const { RateLimiterMemory } = require('rate-limiter-flexible');

const rateLimiter = new RateLimiterMemory({
  keyPrefix: 'middleware',
  points: 20, // 20 requests
  duration: 1, // per 1 second by IP
});

let counter = 0;
const rateLimiterMiddleware = (req, res, next) => {
  rateLimiter.consume(req.connection.remoteAddress)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).send('Too Many Requests');
    });
};

module.exports = rateLimiterMiddleware;