const {Schema, model} = require('mongoose');
const express = require('express');

const ArticleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    user : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    }
}, { collection: 'articles'});

ArticleSchema.method('toJSON', function(){
    const {__v ,...object} = this.toObject();
    return object;
})

module.exports = model('Article', ArticleSchema);