const User = require('../models/user')
const Article = require('../models/articles')
const Company = require('../models/company')
const fs = require('fs'); 

const deleteImage = (path) =>{
    if(fs.existsSync(path)){
        //borrar la imagen vieja
        fs.unlinkSync(path)
    }
}
const updateImage = async(type, id, nameFile) => {
    let pahtOld;
    switch (type) {
        case 'articles':
            const article = await Article.findById(id)    
            if(!article){
                return false;
            }
            pahtOld  = `./uploads/articles/${article.img}`;
            deleteImage(pahtOld); 
            
            article.img = nameFile;
            await article.save();
            return true
        
        case 'companies':
            const company = await Company.findById(id) 
          
            if(!company){
                return false;
            }
            pahtOld = `./uploads/companies/${company.img}`;
            deleteImage(pahtOld); 
            
            company.img = nameFile;
            await company.save();
            return true
    
        case 'users':
            const user = await User.findById(id) 
          
            if(!user){
                return false;
            }
            pahtOld = `./uploads/users/${user.img}`;
            deleteImage(pahtOld); 
            
            user.img = nameFile;
            await user.save();
            return true
            break;
    
        default:
            break;
    }
}

module.exports = {
    updateImage
}