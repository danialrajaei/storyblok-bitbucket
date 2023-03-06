const express = require('express')
const logger = require('npmlog')

const webhookHandler = require('./middlewares/webhook-validation')

logger.level = 'info'
const app = express()
const port = 3000

app.post('/webhook/:webhook?', webhookHandler, (req, res) => {
  const webhookBody = req.body;
  if (!webhookBody) {
    return res.status(HttpStatusCode.BAD_REQUEST);
  }
  if (webhookBody.action === "published") {
    triggerPipeline().then(() => {
      res.status(HttpStatusCode.ACCEPTED)
    }).catch(err => {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR)
    })
  } else {
    // OTHER ACTIONS ARE NOT SUPPORTED
    res.status(HttpStatusCode.BAD_REQUEST);
  }
})

app.listen(port, () => {
  logger.info('SERVER', `Example app listening on port ${port}`)
})