const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');

const registerUser = async (req,res) => {
    const { name, email, password } = req.body; 
    const user = await User.create({ name, email, password });
    res.status(201).json(user);
}
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if(user){
    res.json({message : 'login succes',user});
  }else{
    res.status(401).json({message : 'les information incorrect'})
  }
}
module.exports = { registerUser, loginUser };