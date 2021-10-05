'use strict'

// Disable default RMB functionality

window.document.oncontextmenu = () => {
   return false
}

// Get select menu value for level and listen for change event

var elLevel = document.getElementById('difficulty')
var levelSize = elLevel.value

elLevel.addEventListener('change', (e) => {
   levelSize = e.target.value
   if(levelSize == 4) {
      gLevel.size = 4
      gLevel.mines = 2
      elScoresLevel.innerText = 'begginer'
   }
   else if(levelSize == 8) {
      gLevel.size = 8
      gLevel.mines = 12
      elScoresLevel.innerText = 'medium'
   }
   else if(levelSize == 12) {
      gLevel.size = 12
      gLevel.mines = 30
      elScoresLevel.innerText = 'expert'
   }
   elBombs.innerHTML = `<p>${MINE}x${gLevel.mines}</p>`
   resetGame()
})


// Global variables declarations

const MINE = '<img src="./misc/imgs/bomb.png" />'
const BLOWN_MINE = '<img src="./misc/imgs/clickedbomb.png">'
const FLAG = '<img style="width:22px; height:22px;" src="./misc/imgs/flag.png" />'
const HINT = '<img style="width:23px;" src="./misc/imgs/hint.png" />'
const LIFE = '<img style="width:20px;" src="./misc/imgs/life.png" />'
const SMILEY = '<img onclick="resetGame()" src="./misc/imgs/happy.png" />'
const SURPRISED = '<img onclick="resetGame()" src="./misc/imgs/surprised.png" />'
const INJURED_SMILEY = '<img onclick="resetGame()" src="./misc/imgs/injured.png" />'
const DEAD_SMILEY = '<img onclick="resetGame()" style="width:27px" src="./misc/imgs/dead.png" />'
const WIN_SMILEY = '<img onclick="resetGame()" src="./misc/imgs/win.png" />'


var gBoard = []
var gMines = []
var gLives = []
var gHighScores = []

var gSafe = 3

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
var elBombs = document.querySelector('.bombs')
var elUndo = document.querySelector('.undo')
var elSafeBtn = document.querySelector('.safe-click')
var elScoreCon = document.querySelector('.best-scores')
var elBestScores = elScoreCon.querySelector('ul')
var elScoresLevel = document.querySelector('span')