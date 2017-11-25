const logger = require('logger');

class PetValidator {

    static async createOrUpdateComplete(ctx, next) {
        ctx.checkBody('name').notEmpty().len(2, 20);
        ctx.checkBody('birthdate').notEmpty().isDate();
        ctx.checkBody('vaccinate').notEmpty().isIn([true, false]);
        ctx.checkBody('city').notEmpty().in(['SG', 'M']);
        ctx.checkBody('image').optional().isUrl();

        if (ctx.errors) {
            ctx.body = ctx.errors;
            ctx.status = 400;
            return;
        }
        await next();        
    }

    static async updatePartial(ctx, next) {
        ctx.checkBody('name').optional().len(2, 20);
        ctx.checkBody('birthdate').optional().isDate();
        ctx.checkBody('vaccinate').optional().isIn([true, false]);
        ctx.checkBody('city').optional().in(['SG', 'M']);
        ctx.checkBody('image').optional().isUrl();

        if (ctx.errors) {
            ctx.body = ctx.errors;
            ctx.status = 400;
            return;
        }
        await next(); 
    }

}

module.exports = PetValidator;