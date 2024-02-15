const express=require('express')
const router=express.Router()
const catchasync =require('../errorhandling/catchasync')
const foodfrenzy=require('../models/foodfrenzy')
const review=require('../models/review')
const account=require('../models/account')
const {isLoggedIn}=require('../middleware')
const multer=require('multer')
const {storage}=require('../cloudinary');
const {cloudinary}=require('../cloudinary')


const upload = multer({ storage })



router.get('/profile/:id/Search_Recipie',async(req,res)=>{
    const id=req.params.id;
    const dishes=await foodfrenzy.find({})
    return res.render('foodfrenzy/foodfrenzy',{dishes,id})
})
router.get('/profile/:id/search_recipie/:dishid',catchasync(async(req,res,next)=>{
    const user=await account.findById(req.params.id);
     const choosedDish=await foodfrenzy.findById(req.params.dishid).populate('review')
     const postedperson=await account.findById(choosedDish.author)
     const author=postedperson.profile[0].url
     const authorName=postedperson.username
     return res.render('foodfrenzy/view_dish',{choosedDish,user,author,authorName})
}))
router.get('/profile/:userid/dish/:postid',isLoggedIn,catchasync(async(req,res,next)=>{
    // const choosedDish=await foodfrenzy.findById(req.params.id).populate('review')
  
    const user=await account.findById(req.params.userid)
    const choosedDish=await foodfrenzy.findById(req.params.postid).populate('review')
    const postedperson=await account.findById(choosedDish.author)
    const author=postedperson.profile[0].url
    const authorName=postedperson.username
    return res.render('foodfrenzy/view_dish',{choosedDish,user,author,authorName})

}))
router.get('/profile/:userid/dish/:postid/edit',isLoggedIn,catchasync(async(req,res,next)=>{
    const dish=await foodfrenzy.findById(req.params.postid);
    const user=req.params.userid;
    return  res.render('foodfrenzy/dish_edit',{dish,user})
}))
router.post('/profile/:id/Search_Recipie/:dishid/save',async(req,res)=>{
 const {id,dishid}=req.params;
 const user =await account.findById(id)
 user.savedPost.push(dishid);
 await user.save();
return res.redirect(`/profile/${id}/Search_Recipie/${dishid}`)
})


router.post('/profile/:id/Search_Recipie/:dishid/remove',async(req,res)=>{
  const {id,dishid}=req.params;
  const user = await account.findByIdAndUpdate(
    id,
    { $pull: { savedPost: dishid } },
    { new: true }
);
 return res.redirect(`/profile/${id}/Search_Recipie/${dishid}`)

 })




router.patch('/profile/:userid/dish/:postid/edit',isLoggedIn,catchasync(async(req,res,next)=>{

   const jd=await foodfrenzy.findByIdAndUpdate(req.params.postid,req.body)
   
   return res.redirect(`/profile/${req.params.userid}/dish/${req.params.postid}`)
    
}))
router.delete('/profile/:userid/dish/:postid/delete',catchasync(async(req,res,next)=>{
  
      const {userid,postid}=req.params;
      const reviews=await foodfrenzy.findById(postid).populate('review')
    const filename=reviews.path[0].filename
    await account.updateMany({}, { $pull: { savedPosts: postid } });
    await review.deleteMany(review.review)
    await account.findByIdAndUpdate(userid,{$pull:{posts:postid}})
    await account.updateMany({}, { $pull: { savedPost: postid } });
    await   foodfrenzy.findByIdAndDelete(postid)
      
    cloudinary.uploader.destroy(filename)
 
 res.redirect(`/profile/${userid}`)  



}))

router.post('/profile/:id/search_recipie/:dishid/:emoji/post',async(req,res)=>{

      const findDish = await foodfrenzy.findByIdAndUpdate(
          req.params.dishid,
          {
            $push: {
              [`icons.icon${req.params.emoji}`]: req.params.id
            }
          },
          { new: true }
        );

  
  
  
  }) 
  router.post('/profile/:id/search_recipie/:dishid/:emoji/remove',async(req,res)=>{

    const findDish = await foodfrenzy.findByIdAndUpdate(
        req.params.dishid,
        {
          $pull: {
            [`icons.icon${req.params.emoji}`]: req.params.id
          }
        },
        { new: true }
      );





}) 

router.get('/profile/:id/add_dish',async(req,res,next)=>{
  const id=await req.params.id;
 return res.render('foodfrenzy/add_dish',{id})
})

router.post('/profile/:id/add_dish', upload.single('path'), async (req, res, next) => {
  try {
    const user = await account.findById(req.params.id);
    const content = new foodfrenzy(req.body);

    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    content.path = [{ url: req.file.path, filename: req.file.filename }];
    content.author = req.user._id;

    user.posts.push(content);
    await user.save();
    await content.save();

    return res.redirect(`/profile/${req.params.id}`);
  } catch (error) {
    return next(error);
  }
});
module.exports=router;