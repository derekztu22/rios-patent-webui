const logger = require('./utils/log')
const global = require('./utils/global')
const app = require('./utils/router')

app.listen(global.port, () => { logger.info(`node backend listening on port ${global.port}`) })
