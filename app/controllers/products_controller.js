const express = require('express');
const router = express.Router();
const {Product} = require('../models/product');

//get- localhost:3000/products/
router.get('/',function(req,res){
    Product.find().then(function(products){
         res.send(products)
    }).catch(function(err){
        res.send(error);
    })
});

//get- localhost:3000/products/id
router.get('/:id',function(req,res){
    let id = req.params.id;
    Product.findById(id).then(function(product){
        res.send(product)

    }).catch(function(err){
        res.send(err);
    })
})

//post- localhost:3000/products
router.post('/',function(req,res){
    let body = req.body;
    let c = new Product(body);
    c.save().then(function(product){
        res.send(product);
    }).catch(function(err){
        res.send(err);
    })
})

//put- localhost:3000/products/id
router.put('/:id')

// delete- localhost:3000/products/id
router.delete('/:id',function(req,res){
    let id = req.params.id;
    Product.findByIdAndDelete(id).then(function(){
        res.send({
            notice:'successfully deleted'
        });
    }).catch(function(err){
        res.send(err);
    })
})


module.exports = {
    productsController: router
}