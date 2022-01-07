const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 5,
    message:
        'Vous avez depassez le nombre de tentative vous devez patientez 5 minutes .',
    standarHeaders: true
});

module.exports = limiter;