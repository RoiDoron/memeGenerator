'use strict'

let gElCanvas
let gCtx

const myImage = new Image();
myImage.src = "img/4.jpg";


function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
    addListeners()
}

function onTextInput(text) {
    console.log(text);

    setLineText(text)
    renderMeme()
}

function renderMeme() {
    const elEditor = document.querySelector('.editor-container')
    elEditor.hidden = false
    const meme = getMeme()
    const img = getImg()
    const lines = meme.lines
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    drawText(lines.txt, lines.size, lines.color)
}

function drawText(txt, size, color) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = color

    gCtx.fillStyle = color

    gCtx.font = `${size}px Arial`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'


    gCtx.fillText(txt, 225, 60)
    gCtx.strokeText(txt, 225, 60)
}

function addListeners() {
	
	window.addEventListener('resize', () => {
		resizeCanvas()
		
	})
}

function resizeCanvas() {
	const elContainer = document.querySelector('.canvas-container')

	gElCanvas.width = elContainer.offsetWidth
    
	gElCanvas.height = elContainer.offsetHeight
    renderMeme()
}

/// when there is a gallery
// function onSelectImg(elImg) {
//     coverCanvasWithImg(elImg)
// }