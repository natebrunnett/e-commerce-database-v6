const express     = require('express'),
    router        = express.Router(),
    controller    = require('./products-controller.js');

//findAllReturn 
router.get('/getAll', controller.findAllReturn);

//findAllReturn 
router.post('/add', controller.add);


module.exports = router;