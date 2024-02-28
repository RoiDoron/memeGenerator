'use strict'

function renderGallery() {
    const elGallery = document.querySelector('.gallery-container')

    const HTMLstr = `<div class="img-card"><img id="4" src="img/4.jpg" onclick="onImgSelect(this)"></div><div class="img-card" ><img id="3" src="img/3.jpg" onclick="onImgSelect(this)"></div>`

    elGallery.innerHTML = HTMLstr
}

function onImgSelect(img){
  setImg(img)
  renderMeme()
}