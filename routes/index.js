const express = require('express');
const routes = express.Router();
const user = require('./user')
const passport = require('passport');
const product = require('./Product/product')
const Usercontroller = require('../controler/Usercontroller');
const Admincontroller = require('../controler/Admincontroller')


routes.get('/dashboard',Usercontroller.dashboard)  
routes.get('/',Usercontroller.homepage) 
routes.get('/cart',Usercontroller.cart)      
routes.get('/orders',Usercontroller.getorder)    
routes.use('/user',user) 
routes.use('/Product',product)   
routes.get('/catagoryPro/:id',Usercontroller.getProductsByCategory)

    
module.exports = routes; 
  