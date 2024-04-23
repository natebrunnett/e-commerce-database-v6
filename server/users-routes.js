const express     = require('express'),
    router        = express.Router(),
    controller    = require('./users-controller.js');

router.get('/', controller.findAllReturn);
router.post('/guest', controller.createGuestToken);
router.post('/add', controller.addUser);
router.post('/login', controller.login)
// router.post('/delete', controller.deleteUser);

module.exports = router;