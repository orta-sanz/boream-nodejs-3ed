const logger = require('logger')
const passport = require('koa-passport')
const UserModel = require('models/user.model')
const crypto = require('crypto')
const BasicStrategy = require('passport-http').BasicStrategy
const LocalStrategy = require('passport-local')

const users = [{
    id: 1,
    username: 'admin',
    password: 'admin',
    role: 'ADMIN'
},{
    id: 2,
    username: 'user',
    password: 'user',
    role: 'USER'
}]

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await UserModel.findById(id)
  done(null, user)
})

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: true
}, async (email, password, done) => {
  const user = await UserModel.findOne({ email })
  if(!user) {
    done(null, false)
    return
  }

  const hashPass = crypto.createHash('sha512').update(password + user.salt).digest('hex')
  if(hashPass !== user.password) {
    done(null, false)
    return
  }

  done(null, user)
}))

passport.use(new BasicStrategy((username, password, done) => {
    logger.debug(`Doing authentication with ${username} and ${password}`)
    const user = users.filter((user) => user.username === username && user.password === password)

    if (user.length === 0) {
        done(null, false)
    } else {
        done(null, user[0])
    }
}))
