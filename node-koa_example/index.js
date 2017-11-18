const koa = require('koa')
const logger = require('inc/logger')
const petRouter = require('routes/pet.router')
const htmlRouter = require('routes/html.router')

const hbs = require('koa-hbs')
const koaBody = require('koa-body')
const koaLogger = require('koa-logger')
const koaValidate = require('koa-validate')

const app = new koa()
if(process.env.NODE_ENV !== 'prod') {
  app.use(koaLogger())
}

// Middleware
app.use(hbs.middleware({
  viewPath: `${__dirname}/views`
}))

// Middleware
app.use(htmlRouter.routes())

// Middleware
app.use(petRouter.routes())

// Middleware
app.use(koaBody())

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
