'use strict'

let gElCanvas
let gCtx
let gLines = 1
let currText = 0
const myImage = new Image();
myImage.src = "img/4.jpg";


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
    const img = getImg()
    const lines = meme.lines
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    drawText(lines)

}

function drawText(lines) {
    for (let i = 0; i < gLines; i++) {
        const line = lines[i]
        gCtx.lineWidth = 2
        gCtx.strokeStyle = line.color

        gCtx.fillStyle = line.color

        gCtx.font = `${line.size}px Arial`
        gCtx.textAlign = 'center'
        gCtx.textBaseline = 'middle'


        gCtx.fillText(line.txt, line.x, line.y)
        gCtx.strokeText(line.txt, line.x, line.y)
    }

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
    if (gLines > 1) return
    gLines++
    renderMeme()
}

function onSelectLine() {
    const elInput = document.querySelector('.text')
    const line = SelectLine()

    elInput.value = line.txt
}

function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}