const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = class UserService {
  static async signup({ name, username, email, password }){
    const existingUser = await User.getByUsername({ username });
    const existingEmail = await User.getByEmail({ email });

    if(existingUser) throw new Error('User Already Exists');
    if(existingEmail) throw new Error('Email already in use');

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await User.insert({
      name,
      username,
      email,
      password: passwordHash
    });
    return newUser;
  }
  static async signin({ email, password }){
    try{
      const existingUser = await User.getByEmail({ email });
      if(!existingUser) throw new Error('Invalid Email');
      if(!bcrypt.compareSync(password, existingUser.password)) throw new Error('Invalid Password');

      const token = jwt.sign({ ...existingUser }, process.env.JWT_SECRET, {
        expiresIn: '1 day'
      });

      return token;

    }catch(e){
      e.status = 401;
      throw e;
    }
  }
};
