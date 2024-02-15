const mongoose=require('mongoose');
const Schema=mongoose.Schema
const reviewSchema=new Schema({
    query:String,
    answer:String,
    queryPersonid:String,
    answerpersonid:String,

    answerperson:String,
    profile:String,
    queryPerson:String,
    owner:String,
    
    
})
module.exports=mongoose.model('review',reviewSchema)