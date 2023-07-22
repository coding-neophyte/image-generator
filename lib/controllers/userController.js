const UserService = require('../services/UserService');

const cookieObject = {
  httpOnly: true,
  maxAge: 1000 * 60 * 60 * 24,
  secure: process.env.SECURE_COOKIES === 'true',
  sameSite: process.env.SECURE_COOKIES === 'true' ? 'none' : 'strict',
};

const userSignUp = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    const newUser = await UserService.signup({
      name,
      username,
      email,
      password,
    });

    const token = await UserService.signin({ email, password });

    res
      .cookie(process.env.COOKIE_NAME, token, cookieObject)
      .status(200)
      .json(newUser);
  } catch (e) {
    res.status(401).send({ message: e.message });
  }
};

const userSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await UserService.signin({ email, password });
    res
      .cookie(process.env.COOKIE_NAME, token, cookieObject)
      .status(200)
      .json({ message: 'Signed In' });
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
};

const userLogout = async (req, res) => {
  res.cookies(process.env.COOKIE_NAME, cookieObject).status(204).send();
};

module.exports = { userSignUp, userSignIn, userLogout };
