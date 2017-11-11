const http = require('http')
const log = require('../node-fs_example/class/log')

const app = new http.Server((req, res) => {
  log.info('Starting application')

  const pets= [
    {
      id: 1,
      name: 'Java',
      birthdate: '12/11/14',
      age: 4,
      vaccinate: true,
      city: 'Segovia'
    },
    {
      id: 2,
      name: 'Mika',
      birthdate: '04/04/10',
      age: 7,
      vaccinate: true,
      city: 'Huelva'
    }
  ]

  if(req.method === 'GET' && req.url === '/pets') {
    res.writeHead(200, {
      'Content-type': 'application/json'
    })
    res.write(JSON.stringify(pets))
  } else if(req.method === 'GET' && /\/pet\/\d+/.test(req.url)) {
    let regex = /\/pet\/(\d+)/
    regex.lastIndex = 0

    const id = regex.exec(req.url)[1]
    const pet = pets.find(pet => pet.id === parseInt(id))

    if(pet) {
      res.writeHead(200, {
        'Content-type': 'application/json'
      })
      res.write(JSON.stringify(pet))
    } else {
      res.statusCode = 404
    }
  }

  res.end()
})

app.listen(3000)
