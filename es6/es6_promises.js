/**
 * Crear promesas
 */
function myCall(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(!url) {
        reject(new Error('Mal!'))
      } else {
        resolve(url
      }
    }, 1000)
  })
}

myCall('http://')
  .then((url) => {
    console.log('Completado')
  })
  .catch((err) => {
    console.log('Error')
  })
