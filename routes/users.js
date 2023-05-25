const {Router} = require('express');
const {check} = require('express-validator');
const {getUsers, createUser, updateUser, deleteUser } = require('../controllers/users')

const router = Router();
const {validateFields} = require('../middlewares/validate_field');
const { validateJWT } = require('../middlewares/validate_jwt');


router.get('/', validateJWT,  getUsers);
router.delete('/:id',validateJWT , deleteUser);

router.put('/:id' ,
  [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'email is requireed').isEmail(),
    validateFields
  ], updateUser);

// Create users
// los checks son middlewares, se hace un midd por cada campo
router.post('/', 
    [
        check('name', 'Name is required').not().isEmpty(),
        check('identification', 'Identification is required').not().isEmpty(),
        check('password', 'Password is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        validateFields
    ], createUser);

module.exports = router;