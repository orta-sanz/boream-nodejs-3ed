const fs = require('fs-promise')
const log = require('./log')

// Remove dir function
async function removeDir(path) {
  log.debug(`Removing dir ${path}`)
  const files = await fs.readdir(path)

  if(files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      const file = await fs.lstat(`${path}/${files[i]}`)

      if(file.isDirectory()) {
        await removeDir(`${path}/${files[i]}`)
      } else {
        await fs.unlink(`${path}/${files[i]}`)
      }
    }
  }

  await fs.rmdir(path)
}

// Initial application run
async function run() {
  log.info('Running application')

  log.debug('Checking if dir exists')
  const files = await fs.readdir('.')

  for (let i = 0; i < files.length; i++) {
    const stat = await fs.lstat(`./${files[i]}`)
    if(files[i] === 'logs' && stat.isDirectory()) {
      await removeDir(`./${files[i]}`)
    }
  }

  log.debug('Creating dir')
  await fs.mkdir('logs')

  log.debug('Writting file')
  await fs.writeFile('logs/data.txt', 'Hi')

  log.debug('Reading file')
  let readValue = await fs.readFile('logs/data.txt')
  log.debug(`Read: ${readValue.toString()}`)
}

run().then(() => {})
