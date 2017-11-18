const logger = require('inc/logger')
const Router = require('koa-router')
const petService = require('services/pet.service')
const petValidator = require('validators/pet.validator')

const router = new Router({
  prefix: '/pet'
})

class PetRouter {
  static async getAll(ctx) {
    logger.info('Get all pets')
    ctx.body = await petService.getAll()
  }

  static async getById(ctx) {
    logger.info(`Get by id ${ctx.params.id}`)
    ctx.body = await petService.getById(+ctx.params.id)
  }

  static async create(ctx) {
    logger.info('Create pet with body ', ctx.request.body)
    ctx.body = await petService.create(ctx.request.body)
  }

  static async updateComplete(ctx) {
    logger.info(`Update complete pet with id ${cts.params.id} with body `, ctx.request.body)
    ctx.body = await petService.updateComplete(+ctx.params.id, ctx.request.body)
  }

  static async updatePartial(ctx) {
    logger.info(`Update partial pet with id ${cts.params.id} with body `, ctx.request.body)
    ctx.body = await petService.updatePartial(+ctx.params.id, ctx.request.body)
  }

  static async delete(ctx) {
    logger.info(`Remove pet with id ${cts.params.id}`)
    ctx.body = await petService.delete(+ctx.params.id)
  }
}

const checkExist = async (ctx, next) => {
  logger.debug('Checking if pet exist with id', ctx.params.id)
  const pet = await petService.getById(+ctx.params.id)
  if(!pet) {
    ctx.throw(404, 'Pet not found')
    return
  }
  await next()
}

router.get('/', PetRouter.getAll)
router.get('/:id', checkExist, PetRouter.getById)
router.post('/', petValidator.createOrUpdateComplete, PetRouter.create)
router.put('/:id', petValidator.createOrUpdateComplete, checkExist, PetRouter.updateComplete)
router.patch('/:id', petValidator.updatePartial, checkExist, PetRouter.updatePartial)
router.delete('/:id', checkExist, PetRouter.delete)

module.exports = router
