const mongoose = require('mongoose');
console.log(mongoose)
const Schema = mongoose.Schema;
const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min:1
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 1000
    },
    category: {
        type: Schema.Types.ObjectId,
        required: true
    },
    codeligible: {
        type: Boolean,
        required: true,
        default: true,
        validate:{
            validator:function(value){
                return !(this.price>=25000 && this.codeligible)
               
            },
            message:function(){
                return 'cod is not eligible for this product'
            }
        }
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model('Product',productSchema);
module.exports = {
    Product
}