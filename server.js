const express = require('express'); // import express
const morgan = require('morgan'); // import morgan
const campsiteRouter = require('./routes/campsiteRouter');
const promotionRouter = require('./routes/promotionRouter');
const partnerRouter = require('./routes/partnerRouter');

const hostname = 'localhost';
const port = 3000;

const app = express(); // return express server application
app.use(morgan('dev')); // morgan handles logging the request info
app.use(express.json()); //when the server recieves requests with json data in the body handles parsing json data into js properties of the request object

// root path is specified here so we don't have to use /campsites in campsiteRouter.js
app.use('/campsites', campsiteRouter);
app.use('/promotion', promotionRouter);
app.use('/partners', partnerRouter);

// store data the client sends after the path / as a route parameter: 
// app.get('/campsites/:campsiteId', (req, res) => {
//     res.end(`Will send details of the campsite: ${req.params.campsiteId} to  you`);
// });

// app.post('/campsites/:campsiteId', (req, res) => {
//     res.statusCode = 403;
//     res.end(`POST opereration not supported on /campsites/${req.params.campsiteId}`);
// });

// app.put('/campsites/:campsiteId', (req, res) => {
//     res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
//     res.end(`Will update the campsite: ${req.body.name}
//         with description: ${req.body.description}` 
//     );
// });

// app.delete('/campsites/:campsiteId', (req, res) => {
//     res.end(`Deleting campsite: ${req.params.campsiteId}`);
// });

app.use(express.static(__dirname + '/public')); // dirname: refers the the absolute path of the current directory of the file it's in

app.use(function (req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
