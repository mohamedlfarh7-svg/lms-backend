const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req,res,next)=> {
    let  token;
    if(req.headers.authorization && req.headers.authorization.starsWith('bearer')){
        try{
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.User = await User.find(decoded.id).select('-password')
            next();
        }catch(error) {
            res.status(401).json({message:'token Unauthorized'})
        }
    }
}
module.exports = { protect };