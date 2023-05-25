const {Schema, model} = require('mongoose');
const express = require('express');

const CompanySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    nit: {
        type: String,
        required: true,
        unique: true
    },
    user : {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { collection: 'companies'});

CompanySchema.method('toJSON', function(){
    const {__v ,...object} = this.toObject();
    return object;
})

module.exports = model('Company', CompanySchema);