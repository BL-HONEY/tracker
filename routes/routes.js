const express = require('express'),
      router = express.Router(),
      userController = require('../controller/user'),
      jwtService = require('../services/jwt');
      var expressValidator = require('express-validator');
      router.use(expressValidator())

router.post('/users', userController.addUser);
router.post('/verify', jwtService.verifyToken, userController.verifyUser);
// router.post('/logout', jwtService.verifyToken, userController.logout )

module.exports = router;