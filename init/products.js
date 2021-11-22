const mongoose = require('mongoose');
const db = require('mongoose');
const Product = require('../models/products');


db.connect('mongodb://localhost/shoppingCart',(err)=>{
  if (err) {
    console.log(err);
  }else{
    console.log('done');
  }
});



let products = [
    new Product({
        imgPath:'images/greenshirt1.jpg',
        name:'product one',
        info:{
            storage:128,
            sim:'dual'
        },
        price:223
    }),
    new Product({
        imgPath:'images/greenshirt2.jpg',
        name:'product two',
        info:{
            storage:64,
            sim:'triple'
        },
        price:229
    }),
    new Product({
        imgPath:'images/blueshirt2.jpg',
        name:'product three',
        info:{
            storage:32,
            sim:'one'
        },
        price:128
    }),
    new Product({
        imgPath:'images/apples2.jpg',
        info:{
            storage:16,
            sim:'one'
        },
        price:87
    }),
    new Product({
        imgPath:'images/download.jfif',
        name:'product thre',
        info:{
            storage:256,
            sim:'dual'
        },
        price:289
    }),
]

for (let i = 0; i < products.length; i++) {
    products[i].save((err,done)=>{
        if (err) {
            console.log(err);
        }else{
            console.log(done);
            exitDB();
        }
    })
    
}

function exitDB() {
    db.disconnect()
}