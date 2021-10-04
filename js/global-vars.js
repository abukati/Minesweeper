'use strict'

window.document.oncontextmenu = function () {
   return false;
}

var elLevel = document.getElementById('difficulty')
var levelSize = elLevel.value

elLevel.addEventListener('change', (e) => {
   levelSize = e.target.value
   if(levelSize == 4) {
      gLevel.size = 4
      gLevel.mines = 2
   }
   else if(levelSize == 8) {
      gLevel.size = 8
      gLevel.mines = 12
   }
   else if(levelSize == 12) {
      gLevel.size = 12
      gLevel.mines = 30
   }
   initGame()
})


const MINE = '<img src="./misc/imgs/bomb.png" />'
const FLAG = '<img style="width:22px; height:22px;" src="./misc/imgs/flag.png" />'
const HINT = ''
const LIFE = ''
const SMILEY = ''
const INJURED_SMILEY = ''
const DEAD_SMILEY = ''
const WIN_SMILEY = ''


var gBoard = []
var gMines = []
var gLives = []
var gHighScores = []

var gCell

var gLevel = {
   size: 4,
   mines: 2
}

var gGame = {
   isOn: false,
   shownCount: 0,
   markCount: 0,
   secsPassed: 0,
   isSafe: false,
   isWin: false,
   isHint: false
}


var elSmiley = document.querySelector('.smiley')
var elHints = document.querySelector('.hints')
var elLives = document.querySelector('.lives')