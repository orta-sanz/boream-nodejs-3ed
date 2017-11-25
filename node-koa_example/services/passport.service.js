const passport = require('koa-passport')
const BasicStrategy = require('passport-http').BasicStrategy

passport.use(new BasicStrategy((username, password, done) => {
  if(username === 'admin' && password === 'admin') {
    done(null, {
      name: 'Admin',
      role: 'ADMIN'
    })
  } else {
    done(null, false)
  }
}))
