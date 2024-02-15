const express=require("express")
const router=express.Router()
const catchasync =require('../errorhandling/catchasync')
const review=require('../models/review')
const foodfrenzy=require('../models/foodfrenzy')
const account=require('../models/account')
router.post('/jet',(req,res)=>{
    res.send("hello")
})

router.post('/profile/:id/search_recipie/:dishid/review',catchasync(async(req,res)=>{
    const choosedDish=await foodfrenzy.findById(req.params.dishid)
    const query=new review(req.body)
    const queryPersonProfile=await account.findById(req.params.id)
       query.profile=queryPersonProfile.profile[0].url;
      query.queryPerson=queryPersonProfile.username;
        query.queryPersonid=queryPersonProfile.id;
   await choosedDish.review.push(query)
   await query.save()
   await  choosedDish.save()
   


}))

// router.post('/profile/:id/search_recipie/:dishid/review',catchasync(async(req,res)=>{
//     const choosedDish=await foodfrenzy.findById(req.params.dishid)
//     const query=new review(req.body)

//     //    query.profile=queryPersonProfile.profile[0].url;
//     //   query.queryPerson=queryPersonProfile.username;
//         query.queryPersonid=queryPersonProfile.id;
//    await choosedDish.review.push(query)
//    await query.save()
//    await  choosedDish.save()
   


// }))
router.post('/profile/:id/search_recipie/:dishid/review/:reviewid/reply',catchasync(async(req,res)=>{
const {id,dishid,reviewid}=req.params;
const answer=req.body;
const profile=await account.findById(id);
const findedreview=await review.findById(reviewid);
 findedreview.answerperson=profile.profile[0].url;
 findedreview.answer=req.body.answer;
 findedreview.owner=profile.username;
      findedreview.answerpersonid=profile.id;


await findedreview.save();


}))
// router.post('/profile/:id/search_recipie/:dishid/review/:reviewid/reply',catchasync(async(req,res)=>{
//     const {id,dishid,reviewid}=req.params;
//     const answer=req.body;
//     const profile=await account.findById(id);
//     const findedreview=await review.findById(reviewid);
//     //  findedreview.answerperson=profile.profile[0].url;
//      findedreview.answer=req.body.answer;
//      findedreview.answerpersonid=profile.id;
    
//     await findedreview.save();
    
    
//     }))
router.delete('/profile/:id/search_recipie/:dishid/reviews/:reviewid/delete',catchasync(async(req,res,next)=>{
    const {id,dishid,reviewid}=req.params;
    await foodfrenzy.findByIdAndUpdate(dishid,{$pull:{review:reviewid}})
    await review.findByIdAndDelete(reviewid);
  

    
}))

module.exports=router;