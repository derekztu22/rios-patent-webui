const logger = require('./utils/log')
const global = require('./utils/global')
const app = require('./utils/router')
const https = require('https')
const http = require('http')

// app.listen(global.port, () => { logger.info(`node backend listening on port ${global.port}`) })
http.createServer(app).listen(global.port, () => { logger.info(`http node backend listening on port ${global.port}`) })
// https.createServer(app).listen(global.port, () => { logger.info(`https node backend listening on port ${global.port}`) })