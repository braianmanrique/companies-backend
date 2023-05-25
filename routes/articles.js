const {Router} = require('express');
const {check} = require('express-validator');
const {validateFields} = require('../middlewares/validate_field');
const { validateJWT } = require('../middlewares/validate_jwt');

const { getArticles, createArticle, deleteArticle, updateArticle, getArticleById, sendEmail} = require('../controllers/articles')

   
const router = Router();

router.get('/', validateJWT , getArticles);
router.delete('/:id', validateJWT ,
deleteArticle);

router.get('/:id', validateJWT ,
getArticleById);


router.put('/:id' ,
  [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('company', 'Id compnay should valid').isMongoId(),
    validateFields
  ],
  updateArticle);


router.post('/', 
    [
      validateJWT,
      check('name', 'Name is required').not().isEmpty(),
      check('company', 'El id del company debe de ser valido').isMongoId(),
      validateFields
    ]
     , createArticle);

router.post('/email/', validateJWT, sendEmail)
module.exports = router;