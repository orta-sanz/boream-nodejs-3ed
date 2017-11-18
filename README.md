#Boream Node.js Course

## package.json tips

Install one exact version of the package
`npm install package --save-exact`

Scripts:

Run one script/execution line after `npm install`
- `"postinstall" : "script"`

Run custom scripts (start, test are npm basics)
- `npm run dev`
Where `dev` is the script key

Run the script with NODE_PATH as the project folder with bunyan
- `NODE_PATH=. nodemon index.js | bunyan`

## Node.js used packages
- **koa-hbs** : Handlebars views engine
- **koa-mount** : Allow to change the router prefix without changing the router
- **koa-body** : A full-featured koa body parser middleware
- **koa-logger** : Better error/info messages via console
- **koa-validate** : Validator
- **koa-generic-session** : Session service
- **koa-generic-session-file** : Allow to save sessions inside files

## Docker
Container repos: https://hub.docker.com/

### Commands
- `docker run container:version` - Run containers
- `docker ps` - Show all containers
- `docker stop container_id` - Stop the selected container
- `docker run -p 27017:27017 container:version` - Run the selected container in that port
- `docker run -p -d 27017:27017 container:version` - Run the selected container in detach mode
- `docker exec -it container_id bash` - Enter inside the container with bash

## Mongo
### Commands
- `show dbs` : Show all Databases
- `use dbs_name` : If not found, Mongo will create it
- `db.db_name.find()` : Find
- `show collections` : Show all collectons
- `db.collection.insert({key:value})` : Insert item
- `db.collection.find().pretty()` : Show the results with nice format
- `db.pets.update({_id: ObjectId("5a1023c2631c8066a8e9c5ca")}, {name: 'pepe'})` : Find the item by the first param and **replace** it with the second obj - This will only update the *first* match
- `db.pets.update({location:'SG'}, {$set: {name:'Juan'}})` : This will find all the matches and update the desired item
- `db.pets.remove({condition})` : Remove the selected item
