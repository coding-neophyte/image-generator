const Post = require('../models/Post');
const User = require('../models/User');


const addPost = async (req, res, next) => {
  try{
    const newPost = await Post.insertPost({
      name: req.user.name,
      prompt: req.body.prompt,
      photo: req.body.photo,
      user_id: req.user.id

    });

    console.log(newPost);
    res.status(200).json(newPost);
  }catch(e){
    next(e);
  }
};

const getUserPost = async (req, res, next) => {
  try{
    const { id } = req.user;
    const userPost = await User.getPostsByUserId(id);
    console.log(userPost);

    res.status(200).json(userPost);
  }catch(e){
    next(e);
  }
};

const userPostList = async (req, res, next) => {
  try{
    const { id } = req.user;
    const userPosts = await Post.getUserPost(id);

    console.log(userPosts);

    res.status(200).json(userPosts);

  }catch(e){
    next(e);
  }
};



module.exports = { addPost, getUserPost, userPostList };
