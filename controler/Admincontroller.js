const flash = require('connect-flash')
const bcrypt = require('bcrypt');
const Product = require ('../models/Product')
const User = require('../models/User');
const Order = require('../models/Order');
const Category = require('../models/Category');


 
module.exports.adminpanel = async (req,res) => {

    const data = await Product.find({});

    return res.render('Product/adminpanel.ejs',{
        data
    })
}
module.exports.CreatProduct = async (req,res) =>{

    console.log(req.body);

    const products = await Product.create(
        {
            name : req.body.name,
            price : req.body.price,
            quantity : req.body.quantity,
            category : req.body.category,
            image : req.file.filename,  
        }) 

    const productdata = await Product.find({}).populate('category')

    console.log(products); 
    req.flash('success','Product Add successfully')
    return res.redirect('/Product/adminpanel')
}
module.exports.Productpage = async (req,res) => {
    
    const category = await Category.find({})
    return res.render('admin/addproduct.ejs',{
        category,
    }) 
}
module.exports.categorypage =  (req,res) => {
    return res.render('admin/addcategory.ejs')
}

module.exports.Delete = async (req,res) => {
    await Product.findByIdAndRemove(req.params.id)

    req.flash('success','Product Removed Successfully')
    return res.redirect('/Product/adminPanel');
}
module.exports.Editproduct = async (req ,res) => {

    const myproduct = await Product.findById(req.params.id)

    return res.render('EditPro.ejs',{
        _id : myproduct._id,
        name : myproduct.name,
        price : myproduct.price,
        quantity : myproduct.quantity,
        image : myproduct.image,
    })
}
module.exports.UpdateProduct = async (req,res) => {
    await Product.findByIdAndUpdate(req.params.id, req.body)

    req.flash('success','Product Update Successfully')
    return res.redirect('/Product/adminPanel');
}

module.exports.Buyproduct = async (req , res) => {

    const myproduct = await Product.findById(req.params.id)
    console.log("myproduct",myproduct);

    const id = myproduct._id;
    // console.log("id",id);
   
    const usserquantity = myproduct.quantity;
    const getquantity = Number(req.body.addquantity);
    const orgaquantity = eval(usserquantity - getquantity)
    const Updatequantity = await Product.findByIdAndUpdate(id,{
        quantity : orgaquantity
    });
    
    const Tamount = Updatequantity.price * getquantity

    console.log('id++',req?.user?._id);
    const orderdata = await Order.create({
        image : myproduct.image,
        name : myproduct.name,
        price : myproduct.price,
        quantity : getquantity,
        amount : Tamount,   
        userid : req?.user?._id, 

    })
    req.flash('success','Product Addead');
    return res.redirect('/cart')
} 

module.exports.createCategory = async (req,res) => {
    await Category.create(req.body);
    return res.redirect('/Product/Productpage');
 }

module.exports.delivered = async (req,res) => {
    
    await Order.findByIdAndUpdate(req.params.id,{
         status : 'delivered'
    })
 
     
     req.flash('success','Product Delivered Successfully');
     return res.redirect('/orders');
 }


 module.exports.mobile = async (req,res) => {
    const products = await Product.find({});
    const data = products.filter((i) => i.category == 'Mobile' )

    return res.render('dashboard.ejs',{
        data
    });
}
 module.exports.laptop = async (req,res) => {
    const products = await Product.find({});
    const data = products.filter((i) => i.category == 'Laptop' )

    return res.render('dashboard.ejs',{
        data
    });
}
 module.exports.tv = async (req,res) => {
    const products = await Product.find({});
    const data = products.filter((i) => i.category == 'Tv' )

    return res.render('dashboard.ejs',{  
        data
    });
}
 module.exports.watch = async (req,res) => {
    const products = await Product.find({});
    const data = products.filter((i) => i.category == 'Watch' )

    return res.render('dashboard.ejs',{
        data
    });
}
 module.exports.headphone = async (req,res) => {
    const products = await Product.find({});
    const data = products.filter((i) => i.category == 'Headphone' )

    return res.render('dashboard.ejs',{
        data
    });
} 

  