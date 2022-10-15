const User = require('../models/User');
const Product = require ('../models/Product')
const flash = require('connect-flash')
const bcrypt = require('bcrypt');
const Order = require('../models/Order');
const Category = require('../models/Category');


module.exports.homepage = async (req,res) => {
    res.render('home.ejs')
}
module.exports.dashboard = async (req,res) => {

    const data = await Product.find({}).populate('category')
    const category = await Category.find({});
 
    res.render('dashboard.ejs',{
        data,
        user : req.user,
        category
    })
}

module.exports.register = async (req , res)=>{
    const user = await User.findOne({email : req.body.email});

    if(!user){
        const password = await bcrypt.hash(req.body.password,10);
        req.body.password = password;

        await User.create(req.body)
        req.flash('success','User Registred SuccssFully');
        return res.redirect('/user/login')
    }
    req.flash('error','User is Already Exist')
    return res.redirect('/user/register')
}

module.exports.login = (req , res) => {
    req.flash('success','User Login Successfully')
    return res.redirect('/dashboard');
}

module.exports.logout = async (req,res) => {
    req.logout((error) => {
        if(error){
            return next(error);
        }
        req.flash('error','User Logout Successfully');
        res.redirect('/')
    })
}

module.exports.cart = async (req, res) => {

    const data = await Order.find({}).populate('userid');
     
    return res.render('Product/cart.ejs',{
        data, 
        userid : req.user._id
    })  
} 
module.exports.getorder = async (req,res) => {

    const data =  await Order.find({}).populate('userid')
 
    return res.render('Product/order.ejs',{
         data
    })
} 
module.exports.getProductsByCategory = async (req,res) => {
     
    const products = await Product.find({ category : req.params.id })
    const category = await Category.find({});
   
    console.log(products);  
     return res.render('dashboard.ejs',{
         data : products,   
         category
     });  
 }
        