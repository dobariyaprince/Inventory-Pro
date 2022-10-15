const express = require('express');
const routes = express.Router()
const passport = require('passport');
const passportlocal = require('../../controler/passport-local');
const Admincontroller = require('../../controler/Admincontroller')
const multer = require('multer')
const path = require('path')    

const storage = multer.diskStorage({
    destination :  (req,file,callback) => { 
        callback(null, path.join(__dirname + '/../../public/images' ));
    },  
    filename : (req,file,callback) => {
        callback(null, file.originalname ); 
    }
}); 
  
const upload = multer({storage : storage}).single('image');
   
routes.post('/CreatProduct',upload,Admincontroller.CreatProduct)  
routes.get('/adminPanel',passport.checkAuthentication,Admincontroller.adminpanel)
routes.get('/Editpro/:id',Admincontroller.Editproduct) 
routes.get('/Delete/:id',Admincontroller.Delete) 
routes.post('/Updateproduct/:id',Admincontroller.UpdateProduct); 
routes.post('/Buyproduct/:id',Admincontroller.Buyproduct)   
routes.get('/delivered/:id',Admincontroller.delivered); 
routes.post('/CreatCategory',Admincontroller.createCategory);      
routes.get('/Productpage',Admincontroller.Productpage);         
routes.get('/Catagorypage',Admincontroller.categorypage);        
 

 
module.exports = routes;  
         
 