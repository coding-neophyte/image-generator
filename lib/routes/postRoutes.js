const Authenticated = require('../middleware/authenticate');
const express = require('express');
const Router = express.Router();
const { addPost, getUserPost } = require('../controllers/postsController');
const postAuth = require('../middleware/postAuth');




module.exports = Router.post('/addpost', Authenticated, addPost)
  .get('/userposts', Authenticated, getUserPost);
