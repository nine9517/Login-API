const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users');

router.route('/register').post(UsersController.register);
router.route('/login').post(UsersController.login);
router.route('/login/facebook').post(UsersController.loginWithFacebook);
router.route('/getdata/:id').get(UsersController.getData);

module.exports = router;