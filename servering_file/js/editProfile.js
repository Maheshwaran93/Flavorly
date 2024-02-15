  var button = document.querySelector("#ConfirmButton");
  const username=document.querySelector('#username');
  const rules=document.querySelector('#rules')
  const form=document.querySelector('#Myform')
  const image =document.querySelector('#profilePicture')
  const moveDiv =document.querySelector('#moveDiv')
  const contentBox =document.querySelector('.contentBox')
  username.addEventListener("input", () => {
const inputValue = username.value;
const sanitizedValue = inputValue.replace(/[^a-zA-Z0-9!@#$%^&*()_ +{}\[\]:;<>,.?~\\/-]/g, "");
username.value = sanitizedValue;
});
const userAbout=document.querySelector('#userAbout');
userAbout.addEventListener("input", () => {
const inputValue = userAbout.value;
const sanitizedValue = inputValue.replace(/[^a-zA-Z0-9!@#$%^&*()_ +{}\[\]:;<>,.?~\\/-]/g, "");
userAbout.value = sanitizedValue;
});

const  input=document.querySelector('#fileInput');
input.addEventListener('change',()=>{
    if (input.files.length !==0) {
      const selectedFile = input.files[0];
      const fileURL = URL.createObjectURL(selectedFile);
  
    //   UploadImage.style.display = 'none';
    //   label.style.display = 'none';
    //   image.style.display = 'block';
    // editLabel.style.display ='block'
      image.src = fileURL;
} else {
  console.log('No file has been selected.');
}
})


button.addEventListener("click", (event)=>{
  event.preventDefault();

  rules.style.display="none";
  const startsWithNumber = /^[0-9]/.test(username.value);
      if(username.value.length<7){
        rules.style.display="block"
       return rules.textContent="Username must be great than 6 character"
      }
    else if(startsWithNumber) {
      rules.style.display="block"
      return rules.textContent="Username should not start with a number."
    
    }
    else{
      rules.style.display="none";
      moveDiv.style.display ='block'
      contentBox.style.pointerEvents='none'
      return form.submit();
    
    
    }
})

