const crypto = require('crypto')
const logger = require('npmlog')

const { WEBHOOK_SECRET } = require('../config/webhook-codes')

const webhooks = (process.env.WEBHOOKCODES ?? '').split(',');

/**
 * Webhook validator
 *
 * Check if the webhook call is valid
 */
const webhookHandler = (req, res, next) => {
    const webhookSecret = WEBHOOK_SECRET
    let bodyHmac = crypto.createHmac('sha1', webhookSecret)
        .update(JSON.stringify(req.body))
        .digest('hex');

    if (bodyHmac !== req.headers['webhook-signature']) {
        logger.verbose('WEBHOOK_HANDLER', `Rejected a request with not valid webhook code`)
        res.status(httpStatusCode.FORBIDDEN)
        return;
    }
    logger.verbose('WEBHOOK_HANDLER', `Received a request`)
    next();
};

module.exports = webhookHandler