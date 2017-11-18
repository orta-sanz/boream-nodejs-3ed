const koa = require('koa')
const logger = require('inc/logger')
const petRouter = require('routes/pet.router')
const htmlRouter = require('routes/html.router')

const hbs = require('koa-hbs')
const mount = require('koa-mount')
const koaBody = require('koa-body')
const koaLogger = require('koa-logger')
const koaValidate = require('koa-validate')
const koaSession = require('koa-generic-session')

const app = new koa()
if(process.env.NODE_ENV !== 'prod') {
  app.use(koaLogger())
}

// Middleware (View render engine)
app.use(hbs.middleware({
  viewPath: `${__dirname}/views`
}))

// Middleware (Routes)
app.use(mount('/api/v1', htmlRouter.routes()))
app.use(petRouter.routes())

// Middleware (Body)
app.use(koaBody())

// Middleware set the session obj and the signed key
app.keys = ['mysecret']
app.use(koaSession({
  key: 'jsessionid'
}))

// Middleware (Session)
app.use(async (ctx, next) => {
  logger.debug('Session', ctx.session)
  await next()
  ctx.session.count = (ctx.session.count || 0) + 1
})

// Middleware
koaValidate(app)

// Middleware
app.use(async (ctx, next) => {
  const initTime = Date.now()

  // Call the next Middleware
  await next()

  const time = Date.now() - initTime
  ctx.set('x-response-time', `${time}ms`)
})

app.listen(3000, (err) => {
  err && logger.error('Error listening', err)
  err || logger.info('API listening in port 3000')
})
