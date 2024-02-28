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
            color: 'red',
            x: 225,
            y: 60
        }, {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'red',
            x: 225,
            y: 380
        }
    ]

}

function getMeme() {
    return gMeme
}

function setLineText(txt,line) {
    gMeme.lines[line].txt = txt
}

function setImg(img) {
    gMeme.selectedImgId = img.id
    gCurrImg = img
}

function getImg() {
    return gCurrImg
}

function colorChange(color,line) {
    gMeme.lines[line].color = color
}

function BiggerFont() {
    gMeme.lines[0].size += 1
}

function SmallerFont() {
    gMeme.lines[0].size -= 1
}