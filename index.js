require('dotenv').config()
const express = require('express');
const app = express();
const db = require ('./config/db')
const Bodyparser = require('body-parser');
const routes = require('./routes')
const flash = require('connect-flash');
const flashmessage = require('./middleware/flashmessage');
const mongoose = require('mongoose')
const mongodb = require('mongodb')
const bcrypt = require('bcrypt');
const session = require('express-session')
const passport = require('passport');
const passportlocal = require('./controler/passport-local');
app.use(Bodyparser());  

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(session({
    secret : 'inventory',
    resave : false,
    saveUninitialized : true, 
})); 

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);  
 
app.use(flash());
app.use(flashmessage.flashmessage)

db.mongoose.connect(db.url).then(() => {
    console.log("Mongodb connected");
}).catch((error) => {
    console.log("mongodb err ++",error);
}) 

app.get('/user/register',(req,res) => {
    res.render('user/register.ejs') 
})
app.get('/user/login',(req,res) => {
    res.render('user/login.ejs')  
})

app.use(routes);

app.listen(process.env.PORT , () => {
    console.log("Server Connected");
})  