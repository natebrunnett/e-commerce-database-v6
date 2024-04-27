const express = require('express'),
router = express.Router(),
controller = require('./mail-controller.js');

router.post('/send', controller.Send)
router.post('/sendAccountRecovery', controller.sendAccountRecovery)

module.exports = router;