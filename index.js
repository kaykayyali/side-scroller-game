var express = require('express')
var serveStatic = require('serve-static')

var app = express()

app.use(serveStatic('public', { index: ['index.html'] }))

app.listen(3000)
console.log(`Listening on http://localhost:3000`)