const logger = require('logger')
const Router = require('koa-router')
const crypto = require('crypto')

const UserModel = require('models/user.model')

const router = new Router({
  prefix: '/auth'
})

class AuthRouter {
  static async signUp(ctx) {
    logger.info('SIgnup user with data', ctx.request.body)
    const salt = crypto.randomBytes(20).toString('hex')
    const hash = crypto.createHash('sha512')
      .update(ctx.request.body.password + salt)
      .digest('hex')

    const user = new UserModel({
        email: ctx.request.body.email,
        salt,
        password: hash,
        name: ctx.request.body.name
      }).save()

      ctx.body = user
  }
}

router.post('/sign-up', AuthRouter.signUp)
module.exports = router
