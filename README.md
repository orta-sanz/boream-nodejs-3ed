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
