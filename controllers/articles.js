const { response} = require('express');
const Article = require('../models/articles')


const getArticles = async (req, res = response) => {
    const articles = await Article.find()
                .populate('user','name')
                .populate('company','name nit')

    res.json({
        ok: true,
        msg: 'get articles ',
        articles
    })
}

const getArticleById = async (req, res = response) => {
    const id = req.params.id;

    try {
        const article = await Article.findById(id)
        .populate('user','name img')
        .populate('company','name nit img')
            
        res.json({
        ok: true,
        msg: 'get articles ',
        article
        })
    } catch (error) {
            
        res.json({
            ok: false,
            msg: error,
            })
    }    
   
}


const createArticle = async(req, res = response) => {
    const uid = req.uid;

    const article = new Article({
        user: uid,
        ...req.body,
        
    });
    try {
        const articleDB= await article.save();
        res.json({
            ok: true,
            article: articleDB
        })
    } catch (error) {
        console.log(error)
        res.json({
            ok: false,
            msg: 'hable con el administrador'
        })
    }
  
}

const updateArticle = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {
        const article = await Article.findById(id);

        if(!article){
            return  res.status(404).json({
                ok: false,
                msg: 'There is not article by id'
            })
        }
        const changeArticle = {
            ...req.body,
            user: uid
        }
        const articleUpdated = await Article.findByIdAndUpdate(id, changeArticle, {new: true});

        res.json({
            ok: true,
            article: articleUpdated
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'go to admin'
        })
    }
}

const deleteArticle = async(req, res = response) => {
    const id = req.params.id;

    try {
        const article = await Article.findById(id);
        if(!article){
            return  res.status(404).json({
                ok: false,
                msg: 'There is not article by id'
            })
        }

        await Article.findByIdAndDelete(id)        

        res.json({
            ok: true,
            msg: 'Article deleted'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'go to admin'
        })
    }    
}
module.exports = {
    getArticles, createArticle, deleteArticle, updateArticle, getArticleById
}