const {response} = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
 const {generateJWT} = require('../helpers/jwt');
const { getMenuFront } = require('../helpers/menu-frontend');

const login = async (req , res = response) => {
    const {email, password} = req.body;

    try {
        const userDB =  await User.findOne({email});

        if(!userDB){
            return res.status(404).json({
                ok: false,
                msg: 'Email is not valid'
            });
        }
        // check password
        const validPassword = bcrypt.compareSync(password, userDB.password);

        if(!validPassword){
            return res.status(404).json({
                ok: false,
                msg: 'Password is not valid'
            })
        }

        //generar jwt
        const token = await generateJWT(userDB.id)

        res.json({
            ok: true,
            token,
            msg: 'Login Successful',
            userDB,
            menu: getMenuFront(userDB.role)
            
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Talk with admin'
        }
        )
    }

}


const renewToken  = async(req, res= resposne ) => {
    const uid = req.uid;
    const user = await User.findById(uid);

     //generar jwt
     const token = await generateJWT(uid)   

    res.json({
        ok: true,
        token,
        user,
        menu: getMenuFront(user.role)

    })
}
module.exports = {
    login,
    renewToken
}