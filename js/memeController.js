'use strict'

let gElCanvas
let gCtx
let gLines = 1
let currText = 0
let gStartPos

const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
    addListeners()

}

function renderMeme() {

    const elEditor = document.querySelector('.editor-container')
    elEditor.hidden = false
    const meme = getMeme()
    gLines = meme.howMany
    const img = getImg()
    const lines = meme.lines
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    drawText(meme)


}

function drawText(meme) {
    const lines = meme.lines
    for (let i = 0; i < gLines; i++) {
        const line = lines[i]
        gCtx.lineWidth = 2
        gCtx.strokeStyle = line.color

        gCtx.fillStyle = line.color

        gCtx.font = `${line.size}px ${line.font}`
        gCtx.textAlign = 'center'
        gCtx.textBaseline = 'middle'


        gCtx.fillText(line.txt, line.pos.x, line.pos.y)
        // gCtx.strokeText(line.txt, line.x, line.y)

        if (meme.selectedLineIdx === i) {
            const textWidth = gCtx.measureText(line.txt).width * 1.1
            const lineHeight = line.size * 1.5
            gCtx.strokeRect(line.pos.x - textWidth / 2, line.pos.y - lineHeight / 2, textWidth, lineHeight)

        }
    }

}

function addListeners() {
    addMouseListeners()
    addTouchListeners()

    window.addEventListener('resize', () => {
        resizeCanvas()

    })
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')

    gElCanvas.width = elContainer.offsetWidth

    gElCanvas.height = elContainer.offsetHeight

    changePlaceTxt(elContainer.offsetWidth, elContainer.offsetHeight)

    renderMeme()
}

function onTextInput(text) {
    setLineText(text)
    renderMeme()
}

function onColorChange(color) {
    colorChange(color)
    renderMeme()
}

function onBiggerFont() {
    BiggerFont()
    renderMeme()
}

function onSmallerFont() {
    SmallerFont()
    renderMeme()
}

function onAddLine() {
    AddLine()
    if (gLines > 1) return
    gLines++
    renderMeme()
}

function onDeleteLine() {
    DeleteLine()
    gLines--
    renderMeme()
}

function onSelectLine() {
    const elInput = document.querySelector('.text')
    const line = SelectLine()

    elInput.value = line.txt
    renderMeme()
}

function onFontChange(font) {
    changeFont(font)
    renderMeme()
}

function onUpText() {
    upText()
    renderMeme()
}

function onDownText() {
    downText()
    renderMeme()
}

function onAlignChange(align) {
    const elContainer = document.querySelector('.canvas-container')
    const offsetX = elContainer.offsetWidth
   
    AlignChange(align,offsetX)
    renderMeme()
}

function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const clickedPos = getEvPos(ev)
    if(!isTextClick(clickedPos))return
    const line = isTextClick(clickedPos)
    SelectLineWithClick(line)
    const elInput = document.querySelector('.text')
    elInput.value = line.txt
	gStartPos = getEvPos(ev)        // Get the ev pos from mouse or touch
	if (!isTextClick(gStartPos)) return


	setTextDrag(true)
	//Save the pos we start from
	document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    const meme = getMeme()
	const { isDrag } = meme.lines[meme.selectedLineIdx]
	if (!isDrag) return

	const pos = getEvPos(ev)
	// Calc the delta, the diff we moved
	const dx = pos.x 
	const dy = pos.y 
	moveText(dx, dy)

	// Save the last pos, we remember where we`ve been and move accordingly
	gStartPos = pos
	
    // The canvas is rendered again after every move
	renderMeme()
}

function onUp() {
	setTextDrag(false)
	document.body.style.cursor = 'default'
}

function onCanvasClick(ev) {
    const clickedPos = getEvPos(ev)
    if(!isTextClick(clickedPos))return
    const line = isTextClick(clickedPos)
    SelectLineWithClick(line)
    const elInput = document.querySelector('.text')
    elInput.value = line.txt
    renderMeme()

}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVENTS.includes(ev.type)) {

        ev.preventDefault()         // Prevent triggering the mouse events
        ev = ev.changedTouches[0]   // Gets the first touch point

        // Calc pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function toggleMenu() {
    document.body.classList.toggle('menu-open')
}

function onUploadImg() {
    // Gets the image from the canvas
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg') 

    function onSuccess(uploadedImgUrl) {
        // Handle some special characters
        const url = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
    }
    
    // Send the image to the server
    doUploadImg(imgDataUrl, onSuccess)
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

  function onAbout(){
    const elEditor = document.querySelector('.editor-container')
    elEditor.hidden = true
    const elGallery = document.querySelector('.gallery-container')
    elGallery.hidden = true
    const elAbout = document.querySelector('.about')
    elAbout.hidden = false

  }