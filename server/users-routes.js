const express     = require('express'),
    router        = express.Router(),
    controller    = require('./users-controller.js');

router.get('/', controller.findAllReturn);
router.post('/guest', controller.createGuestToken);
router.post('/add', controller.addUser); //this function will track views
router.post('/login', controller.login)
router.post('/addItemToCart', controller.addItemToCart);
router.post('/removeItemFromCart', controller.removeItemFromCart);
router.post('/verifyToken', controller.verifyToken);
// router.post('/debug', controller.debug) 
//router.post('/debugAdd', controller.ADMIN_ROUTE_CREATE_VIEWS_STAT) 

module.exports = router;