/**
 * Esta función es un generador
 * cada vez que llamemos a la función next se devuelve al siguiente punto
 */
function * generateId() {
  for(let i = 0; ; i++) {
    yield i
  }
}

const generator = generateId()

generator.next() // 0
generator.next() // 1
