const description=document.querySelector('#Paragraph');
const editLabel=document.querySelector('#editLabel')
const Myform=document.querySelector('#myForm')
const moveDiv=document.querySelector('#moveDiv')
const content_box=document.querySelector('#content_box')
const BackButton=document.querySelector('#ancTag')
const PostButton=document.querySelector('#PostButton')
description.addEventListener("input", () => {
const inputValue = description.value;
const sanitizedValue = inputValue.replace(/[^a-zA-Z0-9!@#$%^&*()_ +{}\[\]:;<>,.?~\\/-]+/g, "");

description.value = sanitizedValue;
});
const name=document.querySelector('#Heading');
name.addEventListener("input", () => {
const inputValue = name.value;
const sanitizedValue = inputValue.replace(/[^a-zA-Z0-9!@#$%^&*()_ +{}\[\]:;<>,.?~\\/-]/g, "");
name.value = sanitizedValue;
});
const image=document.querySelector('#UploadedImage')
const UploadImage=document.querySelector('.custom-input')
const label=document.querySelector('#label')
const  input=document.querySelector('#fileInput');input.addEventListener('change',()=>{
    if (input.files.length !==0) {
      const selectedFile = input.files[0];
      const fileURL = URL.createObjectURL(selectedFile);
  
      UploadImage.style.display = 'none';
      label.style.display = 'none';
      image.style.display = 'block';
    editLabel.style.display ='block'
      image.src = fileURL;
} else {
  console.log('No file has been selected.');
}
})
Myform.addEventListener('submit',()=>{
  moveDiv.style.display='block'
  content_box.style.pointerEvents='none'
  BackButton.style.pointerEvents='none'
  PostButton.style.pointerEvents='none'
  editLabel.style.pointerEvents='none'

  
})
