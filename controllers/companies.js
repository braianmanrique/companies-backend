const { response} = require('express');
const Company = require('../models/company')



const getCompanies = async (req, res = response) => {
    const companies = await Company.find()
                                        .populate('user','name')

    res.json({
        ok: true,
        data: companies
    })
}

const createCompany = async(req, res = response) => {

    const uid = req.uid;
    const company = new Company({
        user: uid,
        ...req.body
    });

    try {
        const companyDB= await company.save();

        res.json({
            ok: true,
            company: companyDB 
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            error,
            msg: 'Company is already created'
        })
    }

 
}

const updateCompany = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {
        const company = await Company.findById(id);
        if(!company){
            return  res.status(404).json({
                ok: false,
                msg: 'No se encontro nada por id'
            })
        }
        
        const changesCompany = {
            ...req.body,
            user: uid
        }
        const companyUpdated = await Company.findByIdAndUpdate(id, changesCompany, {new: true});

        res.json({
            ok: true,
            company: companyUpdated
            
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Talk to Admin'
        })
    }    
   
}

const deleteCompany = async (req, res = response) => {
    const id = req.params.id;

    try {
        const company = await Company.findById(id);
        if(!company){
            return  res.status(404).json({
                ok: false,
                msg: 'There is not Company by Id'
            })
        }

        await Company.findByIdAndDelete(id)        

        res.json({
            ok: true,
            msg: 'Company deleted'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'go to admin'
        })
    }    
   
}
module.exports = {getCompanies, createCompany, updateCompany, deleteCompany,}