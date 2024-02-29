'use strict'

let gElCanvas
let gCtx
let gLines = 1
let currText = 0
const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']
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
    drawText(meme)

}

function drawText(meme) {
    const lines = meme.lines
    for (let i = 0; i < gLines; i++) {
        const line = lines[i]
        gCtx.lineWidth = 2
        gCtx.strokeStyle = line.color

        gCtx.fillStyle = line.color

        gCtx.font = `${line.size}px Arial`
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
    
    changePlaceTxt(elContainer.offsetWidth,elContainer.offsetHeight)

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

function onDeleteLine(){
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

function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}

//event listeners

function addMouseListeners() {
	gElCanvas.addEventListener('mousedown', onDown)
	// gElCanvas.addEventListener('mousemove', onMove)
	// gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
	gElCanvas.addEventListener('touchstart', onDown)
	// gElCanvas.addEventListener('touchmove', onMove)
	// gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
	
	// const clickedPos = getEvPos(ev)        
    // console.log(isTextClick(clickedPos))
	
}

function onCanvasClick(ev){
    const clickedPos = getEvPos(ev)        
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

