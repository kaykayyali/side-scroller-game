const express = require('express');
const serveStatic = require('serve-static');
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "http://localhost";
const ENV = process.env.ENV || "dev";


function start() {
    app.use(serveStatic('public', { index: ['index.html'] }));
    app.listen(PORT);
    console.log(`Listening on ${HOST}:${PORT}`); 
}

start()