'use strict'

var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] }]

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines:
    {
        txt: 'I sometimes eat Falafel',
        size: 20,
        color: 'red'
    }

}

function getMeme() {
    return gMeme
}

function setLineText(txt) {
    gMeme.lines.txt = txt
}

function setImg(img){
    gMeme.selectedImgId = img.id
}