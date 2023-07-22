const { userSignIn, userSignUp, userLogout } = require('../controllers/userController');
const express = require('express');
const Router = express.Router();


module.exports = Router.post('/register', userSignUp)
  .post('/signin', userSignIn)
  .delete('/logout', userLogout);
