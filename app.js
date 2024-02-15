if(process.env.NODE_ENV !=="production"){
    require('dotenv').config();
}

const express=require('express')
const app=express();
const foodfrenzy=require('./models/foodfrenzy')
const ejs=require('ejs')
const path=require('path')
const methodOverride = require('method-override')
const ejsMate=require('ejs-mate')
const mongoose = require('mongoose');
const review=require('./models/review')
const foodroute=require('./routes/foodfrenzy_route')
const reviewroute=require('./routes/review_route')
const catchasync =require('./errorhandling/catchasync')
const ExpressError =require('./errorhandling/ExpressError');
const accountroute=require('./routes/authenticate')
const connectroute=require('./routes/connect')
const account=require('./models/account')
const passport=require('passport')
const localstrategy=require('passport-local');
const session=require('express-session')


mongoose.connect('mongodb://127.0.0.1:27017/foodfrenzy')
app.set('view engine','ejs')
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: {
       
        httpOnly: true,
        expires: false
  
 }
  }))
app.use(passport.initialize())
app.use(passport.session())

passport.use(new localstrategy(account.authenticate()))
passport.serializeUser((user, done) => {
    done(null, user.id);
  });
passport.deserializeUser(async (id, done) => {
    try {
      const user = await account.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
app.set('views',path.join(__dirname,'/views'))
app.use(express.json())

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.engine('ejs',ejsMate)
app.use(function(req,res,next){
   res.locals.CurrentUser=req.user;
  
   next()
})
app.use(express.static(path.join(__dirname,'servering_file')));
app.use('/node_modules', express.static('node_modules'));
app.use('',foodroute)
app.use('',reviewroute)
app.use('',accountroute)
app.use('',connectroute)

app.listen(1000,(req,res)=>{
  console.log("The port were started to listern")
})

app.all('*',(req,res,next)=>{
    next(new ExpressError('page not found',404))
})
app.use((err,req,res,next)=>{
    const {statuscode=500}=err;
    if(!err.message) err.message='oh no,something went worng'
       res.status(statuscode).render('error',{err})
   
   })


