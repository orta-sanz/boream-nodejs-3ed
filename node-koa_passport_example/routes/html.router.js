const logger = require('logger');
const Router = require('koa-router');
const petService = require('services/pet.service');
const passport = require('koa-passport');

const router = new Router();

class HTMLRouter {
    static async home(ctx) {
        logger.info('Generating home page');
        await ctx.render('home');
    }

    static async pets(ctx) {
        logger.info('Generating pets page');
        const pets = await petService.getAll();
        await ctx.render('pets', {
            pets
        });
    }
}

async function isAdmin(ctx, next) {
    if (ctx.state.user.role === 'ADMIN') {
        await next();
        return;
    }
    ctx.throw(403, 'Not authorized');
}

router.get('/', HTMLRouter.home);
router.get('/pet', passport.authenticate('basic'), isAdmin, HTMLRouter.pets);

module.exports = router;

