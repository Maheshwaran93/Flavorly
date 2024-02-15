
const forms = document.querySelectorAll('form');
const ownerPhoto =document.querySelector('#ownerPhoto');
const speechBubble =document.querySelector('.speech-bubble ')
const save=document.querySelector('#save');
const saveForm=document.querySelector('#saveForm')
if (save) {
  save.addEventListener('click', () => {
    saveForm.submit();
  });
}

let name = 0;

if (ownerPhoto) {
  ownerPhoto.addEventListener('click', () => {
    if (name === 0) {
      speechBubble.style.display = 'inline-block';
      name = 1;
    } else {
      speechBubble.style.display = 'none';
      name = 0;
    }
  });
}
forms.forEach(form => {
  form.addEventListener('submit', event => {

    setTimeout(function(){
    location.reload();
   }, 100);
  });
});
const textareas = document.querySelectorAll('.answer_box');

textareas.forEach((textarea) => {
  textarea.addEventListener('input', () => {
    adjustTextareaHeight(textarea);
  });

  function adjustTextareaHeight(textarea) {
    textarea.style.height = 'auto';
    const scrollHeight = textarea.scrollHeight;
    const maxHeight = parseInt(getComputedStyle(textarea).maxHeight, 10);
    
 
    const newHeight = textarea.value.trim() === '' ? '30px' : `${Math.min(scrollHeight, maxHeight)}px`;
    textarea.style.height = newHeight;
  }

  
  adjustTextareaHeight(textarea);
});
const replyButtons = document.querySelectorAll('.commentButton');


replyButtons.forEach((replyButton) => {
  let replyBox = replyButton.closest('.review_alignment').querySelector('.reply');
  let resize = replyButton.closest('.review_alignment').querySelector('.query_rised');
  let a = 0;
  

  replyButton.addEventListener('click', () => {
    if (a == 0) {
      
      resize.style.height = "245px";
      replyBox.style.display = "grid";
      a = 1;
    } else {
      resize.style.height = "120px";
      replyBox.style.display = "none";
      a = 0;
    }
  });
});

 const query_box = document.querySelector('.query_center')
const div=document.querySelector('.div')

let isClicked = false;
const button=document.querySelector('#check3')
query_box.style.display='none';
if(button){
button.addEventListener("click", function() {
  isClicked = !isClicked;
  if (isClicked) {
  
    div.style.top="10px"
    query_box.style.display="flex";
    
  }
  else {
    query_box.style.display='none';
    div.style.top="80px"
  }

  const form = document.querySelector('#query_form');
form.addEventListener("submit", function(e) {
  e.preventDefault();
  form.submit();
});
});
}