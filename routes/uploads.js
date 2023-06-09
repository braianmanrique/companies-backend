const {Router} = require('express');
const expressFileUpload = require('express-fileupload');
const { validateJWT } = require('../middlewares/validate_jwt');


const { fileUpload, returnImage } = require('../controllers/uploads');

const router = Router()

router.use(expressFileUpload());

router.put('/:type/:id',
        [ validateJWT ],
        fileUpload);



router.get('/:type/:photo', returnImage)

module.exports = router;