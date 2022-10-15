const mongoose = require('mongoose');

const productschema = mongoose.Schema({
    name : {
        type : String,
    },
    price : {
        type : String,
    },
    quantity : {  
        type : Number
    },
    image : { 
        type : String
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category'
    },
});

const Product = mongoose.model('Product',productschema);
module.exports = Product;