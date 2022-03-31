const { Router } = require('express');
const express = require('express');
const router = express.Router();
const Product = require('../Models/product.nodel')
const httpErrors = require('http-errors');
const createError = require('http-errors');
const mongoose = require('mongoose')

router.get('/', async (req,res) => {
   try {
       const result = await Product.find()
       res.send(result)
       
   } catch (err) {

       console.log(err.message)
   }
});

router.post('/', async (req, res) => {

    try {
        const product = new Product(req.body)
        const result = await product.save()
        res.send(result)
        
    } catch (error) {
        console.log(error.message)
    }
    // console.log(req.body)
    // const product = new Product( {
    //     name : req.body.name,
    //     price : req.body.price
    // })
    // product.save().then(result => {console.log(result), res.send(result)} ).catch(err => {console.log(err.message)})
    
    
    
})

router.get('/:id', async (req, res, next)=>{
    const id = req.params.id
    try {
        const product = await Product.findById(id)
        if(!product){
            throw createError(404 , 'product does not exist')
        }
        res.send(product)
    } catch (err) {
        console.log(err.message)
        // if(error instanceof mongoose.Cas){
        //     next(createError(404,'invalid id'))
            
        // }
        next(err);
    }
})

router.patch('/:id', async (req, res)=>{
    try {
        const id = req.params.id;
        const updates = req.body;
        const options = {new : true};

        const result = await Product.findByIdAndUpdate(id , updates, options)
        res.send(result)
    } catch (error) {
        console.log(error)
    }
    
})

router.delete('/:id', async (req, res)=>{
    const id = req.params.id
    try {
        const product = await Product.findByIdAndDelete(id)
        res.send(product)

    } catch (error) {
        console.log(error.message)
    }
})

module.exports = router ;