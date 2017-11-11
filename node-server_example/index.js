const http = require('http')

const app = new http.Server((req, res) => {
  console.log('New request')

  const pets= [
    {
      name: 'Java',
      birthdate: '12/11/14',
      age: 4,
      vaccinate: true,
      city: 'Segovia'
    },
    {
      name: 'Mika',
      birthdate: '04/04/10',
      age: 7,
      vaccinate: true,
      city: 'Huelva'
    }
  ]

  if(req.method === 'GET' && req.url === '/pet') {
    res.writeHead(200, {
      'Content-type': 'application/json'
    })

    res.write(JSON.stringify(pets))
  }
})

app.listen(3000)
