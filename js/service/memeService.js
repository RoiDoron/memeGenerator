'use strict'

var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] }]
var gCurrImg
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt:'text',
            size: 20,
            color: 'black',
            pos:{x:225,y:60,rate :20},
            id:0
        }, {
            txt:'text',
            size: 20,
            color: 'black',
            pos:{x:225,y:380,rate :20},
            id:1
           
        }
    ]

}

function getMeme() {
    return gMeme
}

function setLineText(txt, line) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
    
}

function setImg(img) {
    gMeme.selectedImgId = img.id
    gCurrImg = img
}

function getImg() {
    return gCurrImg
}

function colorChange(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function BiggerFont() {
    gMeme.lines[gMeme.selectedLineIdx].size += 1
}

function SmallerFont() {
    gMeme.lines[gMeme.selectedLineIdx].size -= 1
}

function changePlaceTxt(offsetWidth,offsetHeight){
    const x =  offsetWidth/2
    gMeme.lines.forEach(line => line.pos.x =x)
    gMeme.lines[1].pos.y = offsetHeight -60
}
function SelectLine() {
    if (gMeme.lines.length > gMeme.selectedLineIdx + 1) gMeme.selectedLineIdx += 1
    else if (gMeme.lines.length === gMeme.selectedLineIdx + 1) gMeme.selectedLineIdx -= 1
    return gMeme.lines[gMeme.selectedLineIdx]

}
function SelectLineWithClick(line){
gMeme.selectedLineIdx = line.id
}

function DeleteLine(){
    const lineIdx = gMeme.lines.findIndex(line => line.id === gMeme.selectedLineIdx)
    gMeme.lines.splice(lineIdx, 1)
}

function AddLine(){
    if(!gMeme.lines.length === 2)return
    gMeme.lines=[
        {
            txt:'text',
            size: 20,
            color: 'black',
            pos:{x:225,y:60,rate :20},
            id:0
        }, {
            txt:'text',
            size: 20,
            color: 'black',
            pos:{x:225,y:380,rate :20},
            id:1
           
        }
    ]
}


function isTextClick(clickedPos) {
    
    const clickText = gMeme.lines.find(line => { 
        const textWidth = gCtx.measureText(line.txt).width * 1.1
        const lineHeight = line.size * 1.5
        const { x, y} = line.pos
        return clickedPos.x >= (x - textWidth / 2) && clickedPos.x <= x + textWidth &&
                clickedPos.y >= (line.pos.y - lineHeight / 2) && clickedPos.y <= y + lineHeight
    })
	
	return clickText
}