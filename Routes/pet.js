const { Router } = require('express');
const express = require('express');
const router = express.Router();
const Product = require('../Models/product.nodel')
const httpErrors = require('http-errors');
const createError = require('http-errors');
const mongoose = require('mongoose');
const Pet = require('../Models/pet.model');


router.post('/', async (req, res, next) => {


    try {
        const microchip = req.body.microchip
        console.log(microchip)
        const pet = await Pet.findOne({microchip : microchip})
        if (pet) {
            let err =  new Error('microchip does exist, change it pls')
            err.status = 422
            throw err
            
        }
        const petTwo = new Pet(req.body)
        const result = await petTwo.save()
        res.send(result)
        
    } catch (err) {
        if(!err.status){
            err.status = 500
        }
        next(err)
    }
   
    
    
})


router.get('/:microchip', async (req, res, next)=>{
    const microchip = req.params.microchip
    try {
        const pet = await Pet.findOne({microchip : microchip})
        if(!pet){
            throw createError(404 , 'pet does not exist')
        }
        res.send(pet)
    } catch (err) {
        console.log(err.message)
       
        next(err);
    }
})

router.post('/edit/:microchip', async (req, res, next)=>{
    const password = req.body.password
    const microchip = req.params.microchip
    try {
        const pet = await Pet.findOne({microchip : microchip})
        if(!pet){
            throw createError(404 , 'pet does not exist')
        }
        if (pet.password !== password) {
            let err =  new Error('incorrect password')
            err.status = 422
            throw err
        }
        res.send(pet)
      

    } catch (err) {
        console.log(err.message)
       
        next(err);
    }
})

router.get('/postedit/:password', async (req, res, next)=>{
    const password = req.params.password
    try {
        const pet = await Pet.findOne({password : password})
        if(!pet){
            throw createError(404 , 'pet does not exist')
        }
        res.send(pet)
    } catch (err) {
        console.log(err.message)
       
        next(err);
    }
})

router.patch('/update/:microchip', async (req, res)=>{
    try {
        const microchip = req.params.microchip;
        const updates = req.body;
        const options = {new : true};

        const result = await Pet.findOneAndUpdate({microchip: microchip}, updates, options)
        res.send(result)
    } catch (error) {
        console.log(error)
    }
    
})



module.exports = router ;
