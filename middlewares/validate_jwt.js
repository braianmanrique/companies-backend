const jwt =require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = (req, res, next) => {

    // read  token
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'There is not token on request'
        });
    }

    try {
        const {uid} = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token is not valid'
        });
    }
   
}
const validateADMIN_ROLE = async(req, res, next) => {
    const ui = req.uid

    try {
        const userDB = await User.findById(ui);
        if(!userDB){
            return res.status(404).json({
                ok: false,
            })
        }

        if(userDB.role !== 'ADMIN_ROLE'){
            return res.status(403).json({
                ok: false,
                msg: 'Error role'
            })
        }
        next();

    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        })
    }
}

const validateADMIN_ROLEMYUSER = async(req, res, next) => {
    const uid = req.uid
    const id = req.params.id;


    try {
        const userDB = await User.findById(uid);
        if(!userDB){
            return res.status(404).json({
                ok: false,
            })
        }

        if(userDB.role === 'ADMIN_ROLE' || uid === id){
            next();
        }else{
            return res.status(403).json({
                ok: false,
                msg: 'Error role'
            })
        }

    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        })
    }
}

module.exports = {
    validateJWT,
    validateADMIN_ROLE,
    validateADMIN_ROLEMYUSER
}