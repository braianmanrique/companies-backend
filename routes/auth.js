const {Router} = require('express');
const {login,  renewToken, updateUser, createUser} = require('../controllers/auth');
const {check} = require('express-validator');
const { validateFields } = require('../middlewares/validate_field');
const { validateJWT } = require('../middlewares/validate_jwt');

const router = Router();

router.post('/' ,
 [
    check('email', 'Email is requireed').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
 ], 
 login
 )

router.get('/renew' ,
   validateJWT, 
   renewToken
)

module.exports = router;