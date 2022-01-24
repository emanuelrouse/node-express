const express = require('express'); // import express
const morgan = require('morgan'); // import morgan

const hostname = 'localhost';
const port = 3000;

const app = express(); // return express server application
app.use(morgan('dev')); // morgan handles logging the request info

app.use(express.static(__dirname + '/public')); // dirname: refers the the absolute path of the current directory of the file it's in

app.use(function (req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
