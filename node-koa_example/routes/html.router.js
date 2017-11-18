const logger = require('inc/logger')
const Router = require('koa-router')
const petService = require('services/pet.service')

const router = new Router()

class HTMLRouter {
  static async home(ctx) {
    logger.info('Generating home page')
    await ctx.render('home')
  }

  static async pets(ctx) {
    logger.info('Generating pets page')
    const pets = await petService.getAll()
    await ctx.render('pets', {
      title: 'Prueba'
    })
  }
}

router.get('/', HTMLRouter.home)
router.get('/pets', HTMLRouter.pets)

module.exports = router
