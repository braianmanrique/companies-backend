const { response} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const {generateJWT} = require('../helpers/jwt')


const getUsers  = async(req, res) => {
    const from = Number(req.query.from) || 0;

    const [users, total] = await Promise.all([
        User.find({}, 'name email identification role  img')
                                        .skip(from)
                                        .limit(5),
        User.countDocuments()
    ]);
    res.json({
        ok: true,
        total,
        users,
        uid: req.uid
    });
}

const createUser = async(req, res= response) => {
    const {email, password, identification} = req.body;

    try{
        const emailExists =await User.findOne({email});
        const idExists =await User.findOne({identification});
        if(emailExists) {
            return res.status(400).json({
                ok: false,
                msg: 'Email is already being used'
            });
        }
        if(idExists) {
            return res.status(400).json({
                ok: false,
                msg: 'Identification is already being used'
            });
        }

        const user = new User(req.body);
        // hash de una sola via
        // es un numero generado de manera aleatorio sin que 
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();
        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            user,
            token
        });

    }catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error review  logs...'
        })
    }
    // const user = new User(req.body);
    // await user.save();

    // res.json({
    //     ok: true,
    //     msg: user
    // });
}

const updateUser = async(req, res = response) => {
    const uid = req.params.id;

    try {
        const userDB = await User.findById(uid);

        if(!userDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe usuario'
            })
        }
        const { password , email, ...fields} = req.body;

        if(userDB.email !== email){    
            const existsEmail = await User.findOne({email});
            if(existsEmail){
                return res.status(400).json({
                    of: false,
                    msg: 'A user already exists in the db'
                });
            }
        }
        fields.email = email;
        const userUpdated = await User.findByIdAndUpdate(uid, fields, {new :true});

        res.json({
            ok: true,
            usario : userUpdated
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: error
        })
    }
}


const deleteUser = async(req, res = response) => {
    const uid = req.params.id;
    try {
        const userDB = await User.findById(uid);

        if(!userDB){
            return res.status(404).json({
                ok: false,
                msg: 'there is nor exists user with this id'
            })
        }   

        await User.findByIdAndDelete(uid);

        return res.status(200).json({
            ok: true,
            msg: 'User deleted',       
        })
    
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error'
        })
    }
   
}
module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}