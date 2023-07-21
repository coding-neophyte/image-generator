const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = class UserService {
  static async signup({ name, username, password }){
    const existingUser = await User.getByUsername({ username });
    if(existingUser) throw new Error('User Already Exists');

    const passwordHash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));

    const newUser = await User.insert({
      name,
      username,
      passwordHash
    });
    return newUser;
  }
  static async signin({ username, password = '' }){
    const existingUser = await User.getByUsername({ username });
    if(!existingUser) throw new Error('Invalid Email');
    if(!bcrypt.compareSync(password, existingUser.password)) throw new Error('Invalid Password');

    const token = jwt.sign({ ...existingUser }, process.env.JWT_SECRET, {
      expiresIn: '1 day'
    });

    return token;
  }
};
