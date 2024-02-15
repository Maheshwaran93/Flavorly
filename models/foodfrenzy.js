const mongoose=require('mongoose');
const review = require('./review');
const { string } = require('joi');
const { Schema } = mongoose;
const foodfrenzySchema=new Schema({
        name:String,
        description:String,
        path:[{
            url:String,
            filename:String
           }],
        author:String,
    
        icons:{
            icon1:[String],
            icon2:[String],
            icon3:[String],
            icon4:[String],
            icon5:[String]
        },
        review:[{
            type:Schema.Types.ObjectId,
            ref:'review'
        }]
 
})
foodfrenzySchema.post('findOneAndDelete',async function(doc){
 if(doc){
    await review.deleteMany({
        _id:{
            $in: doc.review
        }
    })
 }
   
})
module.exports=mongoose.model('foodfrenzy',foodfrenzySchema)


