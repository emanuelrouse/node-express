const express = require('express');
const promotionRouter = express.Router(); // object named express router that we can use with express methods

// chain the methods to the route 
promotionRouter.route('/')
// used to set properties on each HTTP verb so we don't have to do it multi times
.all((req, res, next) => {
    res.statusCode = 200;
    // send back plain text in the response body
    res.setHeader('Content-Type', 'text/plain');
    // go to the next relavent routing method
    next();
})
.get((req, res) => {
    res.end('Will send all the promotions to you');
})
.post((req, res) => {
   // express.json() middleware will come in handy here 
    res.end(`Will add the promotion: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.end('Put operations not supported on /promotions');
})
.delete((req, res) => {
    res.end('Deleting all promotions');
});

promotionRouter.route('/:promotionId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
   res.end(`Will send the details of promotion: ${req.params.promotionId} to you`); 
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /promotions/${req.params.promotionId}`);
})
.put((req, res) => {
    res.write(`Updating the promotion: ${req.params.promotionId}\n`);
    res.end(`Will update the promotion: ${req.body.name}
        with description: ${req.body.description} 
    `);
})
.delete((req, res) => {
    res.end(`Deleting promotion: ${req.params.promotionId}`);
});

module.exports = promotionRouter;