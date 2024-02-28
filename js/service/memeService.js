'use strict'

var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] }]
var gCurrImg
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'black',
            x: 225,
            y: 60
        }, {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'black',
            x: 225,
            y: 380
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

function SelectLine() {
    if (gMeme.lines.length > gMeme.selectedLineIdx + 1) gMeme.selectedLineIdx += 1
    else if (gMeme.lines.length === gMeme.selectedLineIdx + 1) gMeme.selectedLineIdx -= 1
    return gMeme.lines[gMeme.selectedLineIdx]

}