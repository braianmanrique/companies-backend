const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require("../helpers/update-image");
const  patch  = require("path");
const fs = require("fs");



const fileUpload = async(req, res = response) => {
    const type = req.params.type;
    const id = req.params.id;

    const validTypes = ['companies', 'articles', 'users'];

    if( !validTypes.includes(type)){
        return res.status(400).json({
            ok: false,
            msg: 'el tipo seleccionado no es article,user,company'
        })
    }
    // validate if exists file
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }

    // process img
    const file = req.files.image;
    const cutName = file.name.split('.');
    const extFile = cutName[cutName.length -1];

    const validExts = ['png','jpg','jpeg', 'gif', 'pdf'];
    if(!validExts.includes(extFile)){
        return res.status(400).json({
            ok: false,
            msg: 'no es una extension permitida'
        })
    }
    const nameFile = `${uuidv4()}.${extFile}`

    // path para guardar la imagen
    const path = `./uploads/${type}/${nameFile}`;

    // Use the mv() method to place the file somewhere on your server
    file.mv(path, (err) => {
    if (err){
        return res.status(500).send(err);
        }

        // Update db
        updateImage(type,id, nameFile);
      
        res.json({
            ok: true,
            nameFile,
            msg: 'file uploaded'
        })
  });

}

const returnImage = (req, res = response) => {
    const type = req.params.type;
    const photo = req.params.photo;
    const pathImg = patch.join(__dirname, `../uploads/${type}/${photo}`);

    if(fs.existsSync(pathImg)){{
        res.sendFile(pathImg); 
    }}else{
        const pathImg = patch.join(__dirname, `../uploads/no-image.jpg`);
        res.sendFile(pathImg)
    }

// var serveIndex = require('serve-index');
// app.use(express.static(__dirname + '/'))
// app.use('/uploads', serveIndex(__dirname + '/uploads'));
}

module.exports = {
    fileUpload,
    returnImage
}