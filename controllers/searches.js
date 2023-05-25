const { response} = require('express');
const User = require('../models/user');
const Article = require('../models/articles')
const Company = require('../models/company')


const getAll =  async (req, res = response) => {
    const search = req.params.search;
    const regex =  new RegExp(search, 'i');

    const [users, articles ,companies] = await Promise.all([
        User.find({ name: regex}),
        Article.find({name: regex}),
        Company.find({name: regex})
    ])
   
    res.json({
        ok: true,
        search,
        users,
        articles,
        companies  
    })
}

const getDocumentsCollection = async (req, res = response) => {
    const table = req.params.table;
    const search = req.params.search;
    const regex =  new RegExp(search, 'i');

    let data = [];
    switch (table) {
        case 'articles':
            data = await Article.find({name: regex})
                            .populate('user', 'name img')
                            .populate('company', 'name  img')

            break;
        case 'companies':
            data = await Company.find({name: regex})
                            .populate('user', 'name')
                            

            break;
        case 'users':
            data = await User.find({name: regex})

        break;
        default:
           return res.status(400).json({
                ok: false,
                msg: 'No exists table'
            });
            break;

    }
    res.json({
        ok: true,
        data
    })
  
  

}
module.exports = {
    getAll,
    getDocumentsCollection
}