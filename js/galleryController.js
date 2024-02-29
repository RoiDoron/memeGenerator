'use strict'

function renderGallery() {
    const elGallery = document.querySelector('.gallery-container')
    var HTMLstr =''
for (let i = 1; i < 19; i++) {
  
   HTMLstr += `<div class="img-card"><img id="${i}" src="img/${i}.jpg" onclick="onImgSelect(this)"></div>`
  
}
console.log(HTMLstr);


    elGallery.innerHTML = HTMLstr
}

function onImgSelect(img){
const elGallery = document.querySelector('.gallery-container')
elGallery.hidden=true
  setImg(img)
  renderMeme()
}

function onGallery(){
  const elGallery = document.querySelector('.gallery-container')
  elGallery.hidden=false
  const elEditor = document.querySelector('.editor-container')
  elEditor.hidden=true
}