const express = require('express');
const routes = express.Router()
const passport = require('passport');
const Usercontroller = require('../../controler/Usercontroller');
const passportlocal = require('../../controler/passport-local');

routes.post('/login',passport.authenticate('local',{failureRedirect : '/user/login',successFlash : 'success'}), Usercontroller.login)
routes.post('/register', Usercontroller.register)
routes.get('/logout',Usercontroller.logout)
 
       
   
module.exports = routes;      
      