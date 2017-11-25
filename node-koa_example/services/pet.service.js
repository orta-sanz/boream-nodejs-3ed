const logger = require('inc/logger')
const PetModel = require('models/pet.model')

const ObjectId = require('mongoose').Types.ObjectId

class PetService {
  constructor() {
    this.pets = []
  }

  async getAll() {
    return await PetModel.find()
  }

  async getById(id) {
    return await PetModel.findOne({ id: ObjectId(id) })
  }

  async create(data) {
    const pet = new PetModel(data)
    await pet.save()
    return pet
  }

  async updateComplete(id, data) {
    let updatedPet
    this.pets = this.pets.map(pet => {
      if(pet.id === id) {
        data.id = pet.id
        updatedPet = pet
        return data
      }
      return pet
    })

    return updatedPet
  }

  async updatePartial(id, data) {
    let updatedPet
    this.pets = this.pets.map(pet => {
      if(pet.id === id) {
        updatedPet = Object.assing({}, pet, data)
        return updatedPet
      }
      return pet
    })

    return updatedPet
  }

  async delete(id) {
    const pet = this.getById(id)
    this.pets = this.pets.filter(pet => pet.id !== id)
    return pet
  }
}

module.exports = new PetService()
