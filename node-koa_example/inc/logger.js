const bunyan = require('bunyan')

const logger = bunyan.createLogger({
  name: 'Koa-API',
  level: process.env.NODE_ENV === 'prod' ? 'warn' : 'debug'
})
