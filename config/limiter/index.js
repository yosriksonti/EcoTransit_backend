const Bottleneck = require('bottleneck')
const rateLimit = require('express-rate-limit')
const REQLimiter = new Bottleneck({
    maxConcurrent: 100, // Handles max 1000 requests at the same Time
    minTime: 100 // Handles a request batch each 1 Second
  });
const IPLimiter = rateLimit({
  windowMs: 1 * 1 * 1000, // 1 seconds
  max: 50 // limit each IP to 50 requests per windowMs
});
module.exports.REQLimiter = REQLimiter
module.exports.IPLimiter = IPLimiter