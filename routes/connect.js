const express=require('express')
const router=express.Router()
const catchasync =require('../errorhandling/catchasync')
const account=require('../models/account')
const passport=require('passport')
const {isLoggedIn}=require('../middleware')
const foodfrenzy = require('../models/foodfrenzy')
const review=require('../models/review')
const multer=require('multer')
const {storage}=require('../cloudinary');
const {cloudinary}=require('../cloudinary')
const upload = multer({ storage })



router.get('/profile/:id/find_people/:personid/view',async(req,res)=>{
  const user=await account.findById(req.params.personid).populate('posts')
  // for(post of user.posts.reverse()){
  //   console.log(post.path[0].url)
  // }
    res.render('account/followingPerson',{user})
})
router.get('/profile/:id/savedPost',async(req,res)=>{
  const user=await account.findById(req.params.id)
  const savedPostIds = user.savedPost;
  const savedPosts = await foodfrenzy.find({ _id: { $in: savedPostIds } });
res.render('account/savedPost',{savedPosts,savedPostIds,user})
})
router.get('/profile/:id/editProfile',async(req,res)=>{
const user=await account.findById(req.params.id)
res.render('account/editProfile',{user})
})
router.post('/profile/:id/editProfile',upload.single('profile'), async (req, res) => {
let user = await account.findById(req.params.id);
  const filename =user.profile[0].filename
  const { username, about } = req.body;

  const updateReviewObjects = async () => {
    // Update reviews where queryPersonid matches the user's id
    await review.updateMany(
      { queryPersonid: user.id },
      {
        $set: {
          profile: user.profile[0].url,
          queryPerson: user.username
        }
      }
    );
    
    // Update reviews where answerpersonid matches the user's id
    await review.updateMany(
      { answerpersonid: user.id },
      {
        $set: {
          owner: user.username,
          answerperson: user.profile[0].url
        }
      }
    );
  };


  if (username !== user.username) {
    const existingUser = await account.findOne({ username });
    
    if (existingUser) {
      const values = req.body;
      const error = "Username already exists.";
      return res.render('account/editProfile', { values, error, user });
    } else {
      if(req.file){
        cloudinary.uploader.destroy(filename)
        user.profile[0] = { url: req.file.path, filename: req.file.filename };
       await user.save()
      }
  
     user= await account.findByIdAndUpdate(req.params.id, { username, about }, { new: true });

      await updateReviewObjects(); 
      return res.redirect(`/profile/${req.params.id}`);
    }
  } else {
    if(req.file){
      cloudinary.uploader.destroy(filename)
      user.profile[0] = { url: req.file.path, filename: req.file.filename };
     await user.save()
    }
  
   user = await account.findByIdAndUpdate(req.params.id, { username, about }, { new: true });
    await updateReviewObjects();
    return res.redirect(`/profile/${req.params.id}`);
  }
});
router.get('/account/get/:id',async(req,res)=>{
  const user_id=await account.findById(req.params.id);
    res.json(user_id)
})
router.get('/accounts/get/:id',async(req,res)=>{
  const Allaccount=await account.find({})
  const accounts = Allaccount.filter(item => item.id !== req.params.id);
    res.json(accounts)
})

router.get('/profile/:id/find_people',async(req,res,next)=>{
    const Allaccount=await account.find({})
    const accounts = Allaccount.filter(item => item.id !== req.params.id);
    const user_id=await account.findById(req.params.id);
    const sendRequest=user_id.sendRequest;
    res.render('account/findpeople',{accounts,sendRequest,user_id})
   
  })

router.post('/profile/:id/find_people/:requestedid',async(req,res)=>{
   const currentaccount=await account.findById(req.params.id)
    await currentaccount.sendRequest.push(req.params.requestedid)
     const requestedUser=await account.findById(req.params.requestedid);
     await requestedUser.receiveRequest.push(req.params.id)
     await requestedUser.save()
     await currentaccount.save()
    
    //  res.redirect(`/profile/${req.params.id}/find_people`)
   
})

router.post('/profile/:id/find_people/:requestedid/cancel',async(req,res)=>{
  const currentUser=await account.findByIdAndUpdate(req.params.id,{ $pull: { sendRequest: req.params.requestedid }},{ new: true })
  const requestedUser=await account.findByIdAndUpdate(req.params.requestedid,{ $pull: { receiveRequest: req.params.id }},{ new: true })
// res.redirect(`/profile/${req.params.id}/find_people`)
  // res.redirect(`/profile/${req.params.id}/find_people`)
  
  })
router.post('/profile/:id/follow/:followid/request',async(req,res)=>{
  const currentaccount=await account.findById(req.params.id)
  await currentaccount.sendRequest.push(req.params.followid)
   const requestedUser=await account.findById(req.params.followid);
   await requestedUser.receiveRequest.push(req.params.id)
   await requestedUser.save()
   await currentaccount.save()
   res.redirect(`/profile/${req.params.id}`)
})
router.post('/profile/:id/following/:followingid/remove',async(req,res)=>{
  await account.findByIdAndUpdate(req.params.id,{$pull:{Following:req.params.followingid}},{ new: true });
  await account.findByIdAndUpdate(req.params.followingid,{$pull:{Followers:req.params.id}},{ new: true });
  res.redirect(`/profile/${req.params.id}`)
})



router.post('/profile/:id/find_people/:requestedid/accept',async(req,res)=>{
       await account.findByIdAndUpdate(req.params.requestedid,{ $push:{Following:req.params.id,},$pull:{sendRequest:req.params.id}},{ new: true });                           
       await account.findByIdAndUpdate(req.params.id,{ $push:{Followers:req.params.requestedid,},$pull:{receiveRequest:req.params.requestedid }},{ new: true });
       res.redirect(`/profile/${req.params.id}`)
  })
router.post('/profile/:id/follower/:followerid/remove',async(req,res)=>{
 
  await account.findByIdAndUpdate(req.params.id,{$pull:{Followers:req.params.followerid}},{ new: true });
  await account.findByIdAndUpdate(req.params.followerid,{$pull:{Following:req.params.id}},{ new: true });
  res.redirect(`/profile/${req.params.id}`)
})

  router.post('/profile/:id/follow/:requestedid/cancel',async(req,res)=>{
    const currentUser=await account.findByIdAndUpdate(req.params.id,{ $pull: { sendRequest: req.params.requestedid }},{ new: true })
    const requestedUser=await account.findByIdAndUpdate(req.params.requestedid,{ $pull: { receiveRequest: req.params.id }},{ new: true })
    
    res.redirect(`/profile/${req.params.id}`)
     
    })

router.post('/profile/:id/find_people/:requestedid/reject',async(req,res)=>{

const requestedUser=await account.findByIdAndUpdate(req.params.requestedid,{ $pull: { sendRequest: req.params.id }},{ new: true })
const currentUser=await account.findByIdAndUpdate(req.params.id,{ $pull: { receiveRequest: req.params.requestedid }},{ new: true })
res.redirect(`/profile/${req.params.id}`)
 
})
module.exports=router