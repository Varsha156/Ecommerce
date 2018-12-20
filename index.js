const express=require('express');
const app=express();
const port=3000;
const { mongoose } = require('./config/db');
const { categoriesController } = require('./app/controllers/categories_controller');
const { productsController } = require('./app/controllers/products_controller');
const { usersController } = require('./app/controllers/users_controller');
const { bookmarksController } = require('./bookmark/controllers/books_controller')
const { Book } = require('./bookmark/models/book')

app.use(express.json());
app.get('/',function(req,res){
    res.send('welcome to the site');
});

app.use('/categories',categoriesController);
app.use('/products',productsController);
app.use('/users',usersController)
app.use('/bookmarks', bookmarksController);

app.get('/:hash',function(req,res){
    let hash = req.params.hash;
    Book.findOne({hashedUrl:hash}).then(function(book){
        res.redirect(book.originalUrl);
    }).catch(function(err){
        res.send(err);
    })
})

app.listen(port,function(){
    console.log('listening to port',port);
})