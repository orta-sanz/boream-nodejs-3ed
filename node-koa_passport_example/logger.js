const bunyan = require('bunyan');
const logger = bunyan.createLogger({
    name: 'Koa-API',
    level: process.env.NODE_ENV === 'prod' ? 'warn' : 'debug',
    streams: [{
        path: './error.log',
        level: 'error'
    },{
        path: './log.log',
        level: 'debug'
    }, {
        stream: process.stdout
    }]
});

module.exports = logger;

