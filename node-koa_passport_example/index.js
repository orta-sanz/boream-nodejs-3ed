const Koa = require('koa')
const logger = require('logger')

const views = require('koa-views')
const mount = require('koa-mount')
const koaBody = require('koa-body')
const mongoose = require('mongoose')
const convert = require('koa-convert')
const koaLogger = require('koa-logger')
const passport = require('koa-passport')
const koaValidate = require('koa-validate')
const session = require('koa-session-store')
const MongoStore = require('koa-session-mongo')

const petRouter = require('routes/pet.router')
const authRouter = require('routes/auth.router')
const htmlRouter = require('routes/html.router')

mongoose.set('debug', true)
mongoose.Promise = Promise

function onDBReady(err) {
    if(err) {
        logger.error('Error connecting', err)
        process.exit(1)
    }
    logger.info('Connected to Mongodb successfully')
    const app = new Koa()

    if (process.env.NODE_ENV !== 'prod') {
        app.use(koaLogger())
    }

    app.use(koaBody())

    app.keys = ['mysecret']
    app.use(session({
        store: MongoStore.create({url: 'mongodb://localhost:27017/pets_db'})
    }))

    app.use(passport.initialize())
    app.use(passport.session())

    require('services/passport.service')

    app.use(async (ctx, next) => {
        logger.debug('Session', ctx.session)
        await next()
        ctx.session.count = (ctx.session.count || 0) + 1
    })

    koaValidate(app)
    app.use(views(`${__dirname}/views`, {
        extension: 'ejs',
        map: {
            ejs: 'ejs'
        }
    }))

    app.use(async (ctx, next) => {
        const initTime = Date.now()
        await next()
        const time = Date.now() - initTime
        ctx.set('x-response-time', `${time}ms`)
    })

    app.use(htmlRouter.routes())
    app.use(authRouter.routes())
    app.use(mount('/api/v1', petRouter.routes()))

    app.listen(3000, (err) => {
        if (err) {
            logger.error('Error listening', err)
            return
        }
        logger.info('API listening in port 3000')
    })
}

mongoose.connect('mongodb://localhost:27017/pets_db', onDBReady)
