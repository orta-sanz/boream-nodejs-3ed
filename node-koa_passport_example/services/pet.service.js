const logger = require('logger');
const PetModel = require('models/pet.model');

function * GenId() {
    let i = 0;
    for(;;){
        yield i++;
    }
}

class PetService {
    constructor(){
        this.pets = [];
        this.genId = GenId();
    }

    async getAll(page=1, name='', sort='createdAt') {
        const filter = {};
        if (name) {
            filter.name = new RegExp(`${name}`);
        }
        return await PetModel.find(filter).select('-__v').limit(2).skip((page-1)*2).sort(sort);
    }

    async getById(id) {
        return await PetModel.findById(id);
    }

    async create(data) {
        const pet = new PetModel(data);
        await pet.save();
        return pet;        
    }

    async updateComplete(id, data) {
        let pet = await PetModel.findById(id);
        pet = Object.assign(pet, data);
        const newKeys = Object.keys(data);
        Object.keys(pet).forEach(key => {
            if(!newKeys.find(newKey => newKey === key)) {
                delete pet[key];
            }
        });
        await pet.save();
        return pet;
    }

    async updatePartial(id, data) {
        let pet = await PetModel.findById(id);
        pet = Object.assign(pet, data);
        await pet.save();
        return pet;
    }

    async delete(id) {
        let pet = await PetModel.findById(id);
        await pet.remove();
        return pet;
        // const ObjectId = require('mongoose').Types.ObjectId;
        // let pet = await PetModel.findOneAndRemove({_id: ObjectId(id)});

        // await PetModel.remove({_id: ObjectId(id)})
    }

}

module.exports = new PetService();