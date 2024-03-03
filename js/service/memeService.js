'use strict'

var gAlign = 'center'

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'celeb'] },
    { id: 2, url: 'img/2.jpg', keywords: ['funny', 'dog'] },
    { id: 3, url: 'img/3.jpg', keywords: ['funny', 'dog','kids'] },
    { id: 4, url: 'img/4.jpg', keywords: ['funny', 'cat'] },
    { id: 5, url: 'img/5.jpg', keywords: ['funny', 'kids'] },
    { id: 6, url: 'img/6.jpg', keywords: ['funny', 'man'] },
    { id: 7, url: 'img/7.jpg', keywords: ['funny', 'kids'] },
    { id: 8, url: 'img/8.jpg', keywords: ['funny'] },
    { id: 9, url: 'img/9.jpg', keywords: ['funny', 'kids'] },
    { id: 10, url: 'img/10.jpg', keywords: ['funny', 'celeb'] },
    { id: 11, url: 'img/11.jpg', keywords: ['funny', 'basketball'] },
    { id: 12, url: 'img/12.jpg', keywords: ['funny', 'celeb'] },
    { id: 13, url: 'img/13.jpg', keywords: ['funny', 'celeb'] },
    { id: 14, url: 'img/14.jpg', keywords: ['matrix', 'movie'] },
    { id: 15, url: 'img/15.jpg', keywords: ['funny', ',movie'] },
    { id: 16, url: 'img/16.jpg', keywords: ['funny', 'movie'] },
    { id: 17, url: 'img/17.jpg', keywords: ['funny', 'celeb'] },
    { id: 18, url: 'img/18.jpg', keywords: ['funny', 'movie'] },
]
var gCurrImg
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    howMany: 1,
    lines: [
        {
            align: 'center',
            txt: 'text',
            size: 20,
            color: 'black',
            pos: { x: 225, y: 60, rate: 20 },
            id: 0,
            font: 'impact',
            isDrag: false
        }, {
            align: 'center',
            txt: 'text',
            size: 20,
            color: 'black',
            pos: { x: 225, y: 380, rate: 20 },
            id: 1,
            font: 'impact',
            isDrag: false

        }
    ]

}

function Flex() {
    const img = new Image()
    img.src = 'img/9.jpg'
    gCurrImg = img
    gMeme.lines[0].txt = '!זהו יש לי את זה'
    gMeme.lines[0].size = 30

    gMeme.lines[1].txt = '...הקונסול'
    gMeme.lines[1].size = 30
    gMeme.lines[1].color = 'red'
    gMeme.howMany = 2

}

function getImgs(){
return gImgs
}

function getMeme() {
    return gMeme
}

function setLineText(txt) {
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

function changePlaceTxt(offsetWidth, offsetHeight) {
    var x

    if (gAlign === 'center') x = offsetWidth / 2
    if (gAlign === 'left') x = 60
    if (gAlign === 'center') x = offsetWidth - 60

    gMeme.lines.forEach(line => line.pos.x = x)
    gMeme.lines[1].pos.y = offsetHeight - 60
}

function changeFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

function upText() {
    gMeme.lines[gMeme.selectedLineIdx].pos.y -= 1
}

function downText() {
    gMeme.lines[gMeme.selectedLineIdx].pos.y += 1
}

function AlignChange(align, offsetX) {

    gMeme.lines[gMeme.selectedLineIdx].align = align

    var x
    if (align === 'center') x = offsetX / 2
    if (align === 'left') x = 60
    if (align === 'right') x = offsetX - 60

    gMeme.lines[gMeme.selectedLineIdx].pos.x = x

}

function SelectLine() {
    if (gMeme.lines.length > gMeme.selectedLineIdx + 1) gMeme.selectedLineIdx += 1
    else if (gMeme.lines.length === gMeme.selectedLineIdx + 1) gMeme.selectedLineIdx -= 1
    return gMeme.lines[gMeme.selectedLineIdx]

}

function SelectLineWithClick(line) {
    gMeme.selectedLineIdx = line.id
}

function DeleteLine() {
    gMeme.howMany -= 1
    const lineIdx = gMeme.lines.findIndex(line => line.id === gMeme.selectedLineIdx)
    gMeme.lines.splice(lineIdx, 1)
}

function AddLine() {
    gMeme.howMany += 1
    if (gMeme.lines.length === 2) return
    console.log('hi');
    
    gMeme.lines = [
        {
            align: 'center',
            txt: 'text',
            size: 20,
            color: 'black',
            pos: { x: 225, y: 60, rate: 20 },
            id: 0,
            font: 'impact',
            isDrag: false
        }, {
            align: 'center',
            txt: 'text',
            size: 20,
            color: 'black',
            pos: { x: 225, y: 380, rate: 20 },
            id: 1,
            font: 'impact',
            isDrag: false

        }
    ]
}

function isTextClick(clickedPos) {

    const clickText = gMeme.lines.find(line => {
        const textWidth = gCtx.measureText(line.txt).width * 1.1
        const lineHeight = line.size * 1.5
        const { x, y } = line.pos
        return clickedPos.x >= (x - textWidth / 2) && clickedPos.x <= x + textWidth &&
            clickedPos.y >= (line.pos.y - lineHeight / 2) && clickedPos.y <= y + lineHeight
    })

    return clickText
}

function setTextDrag(isDrag) {
    if(gMeme.selectedLineIdx === -1 ) return
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

function moveText(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x = dx

    gMeme.lines[gMeme.selectedLineIdx].pos.y = dy
}

function notSelected(){
    gMeme.selectedLineIdx = -1
}