/**
 * Templates string
 */
let name = 'ale'
let test = `prueba ${name}` // Devuelve prueba ale

/**
 * Clases
 */
class MyClass() {
  constructor(name) {
    this.name = name
  }

  // This está presente
  sayHi() {
    console.log('Hi' + this.name)
  }

  // This no está presente
  static sayGoodBye() {
    console.log('Bye')
  }
}

// Extends de clases
class Vehicle() {
  constructor(numWheels) {
    this.numWheels = numWheels
  }

  run() {  }
}

class Car extends Vehicle {
  constructor(brand, numWheels) {
    // Ejecutar el construct del Padre
    super(numWheels)
  }
}

/**
 * Setear un valor por defecto
 */
func(test) {
  let prueba = test || 0
}

/**
 * Arrow functions
 * bindea el this del entorno donde se está llamando
 */
 class MyClass {
   constructor() {
     this.name = 'Ra'
   }

   timeout() {
     // Antigua forma, thises windows
     setTimeout(function() {
       console.log(`Name: ${this.name}`)
     })

     // Arrow function
     setTimeout(() => {
       console.log(`Name: ${this.name}`)
     })
   }
 }
