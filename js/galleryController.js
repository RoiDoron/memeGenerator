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
const elBtn = document.querySelector('.btn-gallery')
elBtn.classList.remove('push')
  setImg(img)
  renderMeme()
}

function onGallery(btn){
  const elGallery = document.querySelector('.gallery-container')
  elGallery.hidden=false
  const elEditor = document.querySelector('.editor-container')
  elEditor.hidden=true

  btn.classList.add('push')
}

function doUploadImg(imgDataUrl, onSuccess) {
  // Pack the image for delivery
  const formData = new FormData()
  formData.append('img', imgDataUrl)

  // Send a post req with the image to the server
  const XHR = new XMLHttpRequest()
  XHR.onreadystatechange = () => {
      // If the request is not done, we have no business here yet, so return
      if (XHR.readyState !== XMLHttpRequest.DONE) return
      // if the response is not ok, show an error
      if (XHR.status !== 200) return console.error('Error uploading image')
      const { responseText: url } = XHR
      // Same as
      // const url = XHR.responseText

      // If the response is ok, call the onSuccess callback function, 
      // that will create the link to facebook using the url we got
      console.log('Got back live url:', url)
      onSuccess(url)
  }
  XHR.onerror = (req, ev) => {
      console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
  }
  XHR.open('POST', '//ca-upload.com/here/upload.php')
  XHR.send(formData)
}
