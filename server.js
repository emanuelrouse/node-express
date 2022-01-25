const express = require('express'); // import express
const morgan = require('morgan'); // import morgan

const hostname = 'localhost';
const port = 3000;

const app = express(); // return express server application
app.use(morgan('dev')); // morgan handles logging the request info
app.use(express.json()); //when the server recieves requests with json data in the body handles parsing json data into js properties of the request object

// used to set properties on each HTTP verb so we don't have to do it multi times
app.all('/campsites', (req, res, next) => {
    res.statusCode = 200;
    // send back plain text in the response body
    res.setHeader('Content-Type', 'text/plain');
    // go to the next relavent routing method
    next();
});

app.get('/campsites', (req, res) => {
    res.end('Will send all the campsites to you');
});

app.post('/campsites', (req, res) => {
   // express.json() middleware will come in handy here 
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
});

app.put('/campsites', (req, res) => {
    res.end('Put operations not supported on /campsites');
});

app.delete('/campsites', (req, res) => {
    res.end('Deleting all campsites');
});

// store data the client sends after the path / as a route parameter: 
app.get('/campsites/:campsiteId', (req, res) => {
    res.end(`Will send details of the campsite: ${req.params.campsiteId} to  you`);
});

app.post('/campsites/:campsiteId', (req, res) => {
    res.statusCode = 403;
    res.end(`POST opereration not supported on /campsites/${req.params.campsiteId}`);
});

app.put('/campsites/:campsiteId', (req, res) => {
    res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
    res.end(`Will update the campsite: ${req.body.name}
        with description: ${req.body.description}` 
    );
});

app.delete('/campsites/:campsiteId', (req, res) => {
    res.end(`Deleting campsite: ${req.params.campsiteId}`);
});

app.use(express.static(__dirname + '/public')); // dirname: refers the the absolute path of the current directory of the file it's in

app.use(function (req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
