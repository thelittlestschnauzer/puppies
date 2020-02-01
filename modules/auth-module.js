const db = require("../data/dbConfig.js");

require('dotenv').config();
const Admins = require('./admin-module.js');
const Kennels = require('./kennels-module.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwtKey = process.env.JWT_SECRET || 'this is just a test';
const secret = process.env.JWT_SECRET || 'this is just a test';

module.exports = {
  authenticate,
  register,
  login,
  generateToken
};

function authenticate(req, res, next) {
  const token = req.get('Authorization');
  if (token) {
    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) {
        res.status(401).json(err);
      }
      else{
        req.decoded = decoded;
        next();
      } 
    })
  } else {
    res.status(401).json({ error: 'No token provided, must be set on the Authorization Header'});
  }
}
async function register(user) {
    let { username, password } = user
    const name = user.kennel_name
    
    // implement user registration
    const hash = bcrypt.hashSync(password, 12); // 2 ^ n
    password = hash;
    const addKennel = await Kennels.add({name})
    const saved = await Admins.add({username, password, 'kennel_id': addKennel.id})
    try {
      return ({token: generateToken(saved), id: saved.id })
    } 
    catch (error) {
      return error 
    }
  }
  //Generate Token
function generateToken(user){
  const payload = {
      id: user.id,
      username: user.username,
  };
  const options ={
      expiresIn: '24h',
  };
  return jwt.sign(payload, secret, options)
  }

async function login(username) {
// implement user login
  return await Admins.findBy({username}) 
}

module.exports = {}