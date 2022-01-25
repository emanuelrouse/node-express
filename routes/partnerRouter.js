const express = require('express');
const partnerRouter = express.Router(); // object named express router that we can use with express methods

// chain the methods to the route 
partnerRouter.route('/')
// used to set properties on each HTTP verb so we don't have to do it multi times
.all((req, res, next) => {
    res.statusCode = 200;
    // send back plain text in the response body
    res.setHeader('Content-Type', 'text/plain');
    // go to the next relavent routing method
    next();
})
.get((req, res) => {
    res.end('Will send all the partners to you');
})
.post((req, res) => {
   // express.json() middleware will come in handy here 
    res.end(`Will add the partner: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.end('Put operations not supported on /partners');
})
.delete((req, res) => {
    res.end('Deleting all partners');
});

partnerRouter.route('/:partner')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
   res.end(`Will send the details of partner: ${req.params.partner} to you`); 
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /partners/${req.params.partner}`);
})
.put((req, res) => {
    res.write(`Updating the partner: ${req.params.partner}\n`);
    res.end(`Will update the partner: ${req.body.name}
        with description: ${req.body.description} 
    `);
})
.delete((req, res) => {
    res.end(`Deleting partner: ${req.params.partner}`);
});

module.exports = partnerRouter;