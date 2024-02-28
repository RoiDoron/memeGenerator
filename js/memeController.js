'use strict'

let gElCanvas
let gCtx

const myImage = new Image();
myImage.src = "img/4.jpg";


function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
}

function onTextInput(text){
    console.log(text);
    
    setLineText(text)
    renderMeme()
}

function renderMeme(img) {
    const meme = getMeme()
    const lines = meme.lines
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    drawText(lines.txt,lines.size,lines.color)
}

function drawText(txt,size,color) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = color

    gCtx.fillStyle = color

    gCtx.font = `${size}px Arial`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'


    gCtx.fillText(txt, 208, 60)
    gCtx.strokeText(txt, 208, 60)
}



/// when there is a gallery
// function onSelectImg(elImg) {
//     coverCanvasWithImg(elImg)
// }