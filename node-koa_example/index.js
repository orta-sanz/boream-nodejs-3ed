const koa = require('koa')
const logger = require('koa-logger')
const log = require('../node-fs_example/class/log')

const pets= [
  {
    id: 1,
    name: 'Java',
    birthdate: '12/11/14',
    age: 4,
    vaccinate: true,
    city: 'Segovia'
  },
  {
    id: 2,
    name: 'Mika',
    birthdate: '04/04/10',
    age: 7,
    vaccinate: true,
    city: 'Huelva'
  }
]

const app = new koa()
if(process.env.NODE_ENV !== 'prod') {
  app.use(logger())
}

// Middleware #1
app.use(async (ctx, next) => {
  const initTime = Date.now()

  // Call the next Middleware
  await next()

  const time = Date.now() - initTime
  ctx.set('x-response-time', `${time}ms`)
})

// Middleware #2
app.use(async (ctx) => {
  ctx.body = pets
})

app.listen(3000)
