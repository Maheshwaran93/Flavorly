const bellButton=document.querySelector('.notification_button');
const notification=document.querySelector('.position_of_notification');
const followers=document.querySelector('#Followers')
const followersNotification=document.querySelector('.position_of_FollowerNotification')
const following=document.querySelector('#Following')
const followingNotification=document.querySelector('.position_of_FollowingNotification')
const blurs=document.querySelector('#blur');
const body=document.querySelector('body')
const postsections=document.querySelector('.post-sections')

var flag=0;
var flag2=0;
var flag3=0;
bellButton.addEventListener('click', () => {
    if (flag==0) {
      notification.style.display = 'flex';
      blurs.style.display='block';
      postsections.style.boxShadow='0px 0px 0px rgba(0, 0, 0, 0)';
      postsections.style.border='none'
      flag=1;
    } else {
      notification.style.display = 'none';
      blurs.style.display='none'
      postsections.style.border='1px solid rgba(217, 217, 217, 1)'
      postsections.style.boxShadow='2px 2px 4px rgba(0, 0, 0, 0.25)';
      flag=0;
    }
  });


  following.addEventListener('click',()=>{
    if (flag2==0) {
      followingNotification.style.display = 'flex';
      blurs.style.display='block';
      postsections.style.boxShadow='0px 0px 0px rgba(0, 0, 0, 0)';
      postsections.style.border='none'
      flag2=1;
    } else{
      followingNotification.style.display = 'none';
      blurs.style.display='none'
      postsections.style.border='1px solid rgba(217, 217, 217, 1)'
      postsections.style.boxShadow='2px 2px 4px rgba(0, 0, 0, 0.25)';
      flag2=0;
    }
  })
  followers.addEventListener('click',()=>{
    if (flag3==0) {
      followersNotification.style.display = 'flex';
      blurs.style.display='block';
      postsections.style.boxShadow='0px 0px 0px rgba(0, 0, 0, 0)';
      postsections.style.border='none'
      flag3=1;
    } else {
      followersNotification.style.display = 'none';
      blurs.style.display='none'
      postsections.style.border='1px solid rgba(217, 217, 217, 1)'
      postsections.style.boxShadow='2px 2px 4px rgba(0, 0, 0, 0.25)';
      flag3=0;
    }
  })

  blurs.addEventListener('click',()=>{
    if(flag==1){
      notification.style.display = 'none';
      blurs.style.display='none'
      postsections.style.border='1px solid rgba(217, 217, 217, 1)'
      postsections.style.boxShadow='2px 2px 4px rgba(0, 0, 0, 0.25)';
      flag=0;
    }
    if(flag2==1){
      followingNotification.style.display = 'none';
      blurs.style.display='none'
      postsections.style.border='1px solid rgba(217, 217, 217, 1)'
      postsections.style.boxShadow='2px 2px 4px rgba(0, 0, 0, 0.25)';
      flag2=0;
    }
    if(flag3==1){
      followersNotification.style.display = 'none';
      blurs.style.display='none'
      postsections.style.border='1px solid rgba(217, 217, 217, 1)'
      postsections.style.boxShadow='2px 2px 4px rgba(0, 0, 0, 0.25)';
      flag3=0;
    }
  })

  following.addEventListener('click',()=>{
  console.log("hello")
})