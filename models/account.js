
const mongoose=require('mongoose');
const passport = require('passport');
const foodfrenzy=require('./foodfrenzy')

const Schema=mongoose.Schema;
const passportLocalMongoose =require('passport-local-mongoose')
const AccountSchema=new Schema({
    email:String,
    username:String,
    password:String,
    profile:[{
            url:String,
            filename:String
           }],
    sendRequest:[String],
    receiveRequest:[String],
    Followers:[String],
    Following:[String],
    crown:String,
    about:String,
    savedPost:[String],
    posts:[{
      type:Schema.Types.ObjectId,
      ref:'foodfrenzy'
    
    }]
})

AccountSchema.plugin(passportLocalMongoose)
module.exports=mongoose.model('account',AccountSchema)