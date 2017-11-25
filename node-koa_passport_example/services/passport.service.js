const logger = require('logger');
const passport = require('koa-passport');
const BasicStrategy = require('passport-http').BasicStrategy;

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
}];

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = users.filter(user => user.id === id);
    done(null, user[0]);
});


passport.use(new BasicStrategy((username, password, done) => {
    logger.debug(`Doing authentication with ${username} and ${password}`);
    const user = users.filter((user) => user.username === username && user.password === password);
    if (user.length === 0){
        done(null, false);
    } else {
        done(null, user[0]);
    }
}));