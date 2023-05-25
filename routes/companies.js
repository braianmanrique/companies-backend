const {Router} = require('express');
const {check} = require('express-validator');

const {validateFields} = require('../middlewares/validate_field');
const { validateJWT } = require('../middlewares/validate_jwt');

const {  getCompanies,
  createCompany,
   deleteCompany,
   updateCompany} = require('../controllers/companies')

   
const router = Router();

router.get('/', validateJWT , getCompanies);

router.put('/:id' ,
  [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    validateFields
  ],
  updateCompany);


router.post('/', 
    [
      validateJWT,
      check('nit', 'Nit is required').not().isEmpty(),
    check('name', 'Name is required').not().isEmpty(),
    validateFields
    ]
     , createCompany);


router.delete('/:id' , validateJWT, deleteCompany);


module.exports = router;