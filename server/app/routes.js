var express = require('express');
var router = express.Router();
var auth = require('./auth.js');

/*
* Routes that can be accessed by any one
*/
router.get('/sayhello', auth.sayhello);

/*
* Routes that can be accessed only by autheticated users
*/
router.post('/login', auth.login);

// Export the module
module.exports = router;