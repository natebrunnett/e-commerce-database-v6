const express     = require('express'),
    router        = express.Router(),
    controller    = require('./todos-controller.js');

//findAllReturn 
router.get('/', controller.findAllReturn);
router.post('/add', controller.addItem);
router.post('/delete', controller.deleteItem);
router.post('/update', controller.updateItem);

module.exports = router;