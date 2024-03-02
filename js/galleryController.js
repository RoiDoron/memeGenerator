'use strict'

function renderGallery() {
  const elGallery = document.querySelector('.gallery-container div')
  var HTMLstr = ''
  for (let i = 1; i < 19; i++) {

    HTMLstr += `<div class="img-card"><img id="${i}" src="img/${i}.jpg" onclick="onImgSelect(this)"></div>`
  }
  elGallery.innerHTML = HTMLstr
}

function onImgSelect(img) {
  const elGallery = document.querySelector('.gallery-container')
  elGallery.hidden = true

  const elBtn = document.querySelector('.btn-gallery')
  elBtn.classList.remove('push')

  setImg(img)
  renderMeme()
}

function onGallery(btn) {
  const elGallery = document.querySelector('.gallery-container')
  elGallery.hidden = false

  const elEditor = document.querySelector('.editor-container')
  elEditor.hidden = true

  const elAbout = document.querySelector('.about')
  elAbout.hidden = true

  btn.classList.add('push')
}

function onFlex(){
  const elGallery = document.querySelector('.gallery-container')
  elGallery.hidden = true

  Flex()

  renderMeme()
}

function onImgInput(ev) {
  loadImageFromInput(ev, onImgSelect)
}

function loadImageFromInput(ev, onImageReady) {
  const reader = new FileReader()

  reader.onload = ev => {
      let img = new Image() 
      img.src = ev.target.result 
      img.onload = () => onImageReady(img)
  }
  reader.readAsDataURL(ev.target.files[0]) 
}

