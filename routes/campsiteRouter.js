const express = require('express');
const campsiteRouter = express.Router(); // object named express router that we can use with express methods

// chain the methods to the route 
campsiteRouter.route('/')
// used to set properties on each HTTP verb so we don't have to do it multi times
.all((req, res, next) => {
    res.statusCode = 200;
    // send back plain text in the response body
    res.setHeader('Content-Type', 'text/plain');
    // go to the next relavent routing method
    next();
})
.get((req, res) => {
    res.end('Will send all the campsites to you');
})
.post((req, res) => {
   // express.json() middleware will come in handy here 
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.end('Put operations not supported on /campsites');
})
.delete((req, res) => {
    res.end('Deleting all campsites');
});


module.exports = campsiteRouter;