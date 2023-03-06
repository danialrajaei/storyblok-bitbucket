const logger = require('npmlog')

const webhooks = (process.env.WEBHOOKCODES ?? '').split(',');

/**
 * Webhook validator
 *
 * Check if the webhook call is valid
 */
const webhookHandler = (req, res, next) => {
    const webhookCode = req.params.webhookcode;
    if (!webhookCode && webhooks.length > 0) {
        logger.verbose('WEBHOOK_HANDLER', `Rejected a request with no webhook code`)
        res.status(httpStatusCode.UNAUTHORIZED);
        return;
    } else if (webhooks.indexOf(webhookCode) === -1) {
        logger.verbose('WEBHOOK_HANDLER', `Rejected a request with not valid webhook code`)
        res.status(httpStatusCode.FORBIDDEN)
        return;
    }
    logger.verbose('WEBHOOK_HANDLER', `Received a request`)
    next();
};

module.exports = webhookHandler