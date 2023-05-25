const {Schema, model} = require('mongoose');
const express = require('express');


const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'    
    },
    identification: {
        type: String,
        unique: true,
        required : true
    }
});

UserSchema.method('toJSON', function(){
    // instancia del objeto actual el toObject --¿? - configuracion global 
    const {__v, _id, password ,...object} = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('User', UserSchema);