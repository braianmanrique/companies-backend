const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async() => {

    try{
        await mongoose.connect(process.env.DB_CNN , {
            useNewUrlParser: true,
            useUnifiedTopology: true
            });
        console.log('db online');
    }catch(error){
        console.log(error);
        throw new Error('Error al iniciar la db');
    }
   
}

module.exports = {
    dbConnection
}