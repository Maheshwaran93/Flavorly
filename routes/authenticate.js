const express=require('express')
const router=express.Router()
const catchasync =require('../errorhandling/catchasync')
const account=require('../models/account')
const passport=require('passport')
const multer=require('multer')
const {storage}=require('../cloudinary');
const {cloudinary}=require('../cloudinary')
const upload = multer({ storage })
// const {isLoggedIn}=require('../middleware/isloggedin')
router.get('/register',catchasync(async(req,res,next)=>{
   return res.render('account/signup')
}))
router.post('/register',catchasync(async(req,res)=>{
  const {email,username,password}=req.body;
  const existingUser = await account.findOne({ username });
  if(existingUser){
    const values=req.body;
    const error="happened"
      return res.render('account/signup',{values,error})
  }
 if(!existingUser){
  const value=req.body;
   return res.render('account/signup2',{value})
 }

}))
router.get('/login',catchasync(async(req,res)=>{
 return res.render("account/login")
}))
router.post('/login', (req, res, next) => {
  passport.authenticate('local', async(err, user, info) => {
    const detail=req.body;
  
    if (err) {
      // Handle internal server error
      return console.log("something went wrong")
    }
    if (!user) {
      // Authentication failed, redirect back to the login page with error message
     return res.render('account/login',{err,detail})
    }
    // Authentication successful, log in the user
    req.logIn(user, async(err) => {
      if (err) {
        // Handle internal server error
      return console.log("something went wrong")
      }
      // Redirect to the dashboard
      const persondetail=await account.findOne({username:detail.username})
      return res.redirect(`/profile/${persondetail.id}`)
    });
  })(req, res, next);
});
router.get('/profile/:id',catchasync(async(req,res)=>{

  const user=await account.findById(req.params.id).populate('posts');
  const Following=[];
  for(following of  user.Following){

    let data=await account.findById(following);
    let {id,profile,username,Followers}=data;
    const pickedData=await {id,profile,username,Followers};
    await Following.push(pickedData);
}
const followers=[];
for(follower of  user.Followers){

  let data=await account.findById(follower);
  let {id,profile,username,Followers}=data;
  const pickedData=await {id,profile,username,Followers};
  
  await followers.push(pickedData);

}
  const request=[];
  for(receiveRequest of  user.receiveRequest){

       let data=await account.findById(receiveRequest);
      let {id,profile,username,Followers}=data;
      const pickedData=await {id,profile,username,Followers};
      await request.push(pickedData);
  }

     const num=1
   return res.render('account/profile',{user,request,Following,followers,num })
 
}))

router.get('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) {
      // Handle error if logout fails
      return res.redirect('/'); // Redirect to homepage or an error page
    }
    return res.redirect('/login'); // Redirect to the login page after successful logout
  });
});

router.post('/profile',upload.single('profile'),catchasync(async(req,res,next)=>{

  const {email,username,password,profile,about}=req.body;
  const user=new account({email,username,about})
  
  req.session.user_id=user._id;
  user.profile=[{ url: req.file.path, filename: req.file.filename }];


  const registereduser=await account.register(user,password)
  req.login(registereduser,err=>{
    if(err)return next(err);
    return res.redirect(`/profile/${registereduser.id}`)
    
  })

}))



module.exports=router;