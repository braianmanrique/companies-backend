const {Router} = require('express');
const {check} = require('express-validator');
const {validateFields} = require('../middlewares/validate_field');
const { validateJWT } = require('../middlewares/validate_jwt');

const { getAll, getDocumentsCollection} = require('../controllers/searches')
const router = Router();

router.get('/:search',
        [ validateJWT ],
        getAll);


router.get('/collection/:table/:search', validateJWT, getDocumentsCollection)
module.exports = router;