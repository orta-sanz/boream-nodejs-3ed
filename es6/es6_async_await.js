/**
 * async
 * Conseguimos que cualquier función devuelva una promesa
 */
 async function myCall(url) {
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

/**
 * await
 * Espera a que devuelva la promesa antes de seguir con la ejecución del código
 */
await myCall('http')
console.log('Finish')
