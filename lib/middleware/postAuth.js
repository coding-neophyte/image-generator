const Post = require('../models/Post');
const User = require('../models/User');


module.exports = async (req, res, next) => {
  try{
    if(req.method === 'GET'){
      const userPost = await User.getPostsByUserId(req.params.id);
      console.log(userPost);
      if(req.user.id !== userPost.user_id){
        throw new Error('Not Authorized to View');
      }
    }
    next();
  }catch(e){
    e.status = 403;
    next(e);
  }

};
