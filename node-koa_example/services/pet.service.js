const logger = require('inc/logger')

class PetService {
  constructor() {
    this.pets = []
  }

  async getAll() {
    return this.pets
  }

  async getById(id) {
    return this.pets.find(pet => pet.id === id)
  }

  async create(data) {
    data.id = Math.random()
    this.pets.push(data)
    return data
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
