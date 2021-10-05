'use strict'

// Game progression control functions

var elSmiley = document.querySelector('.smiley')
var elHints = document.querySelector('.hints')
var elBombs = document.querySelector('.bombs')
var elUndo = document.querySelector('.undo')
var elSafeBtn = document.querySelector('.safe-click')


var gGame = {
   isOn: false,
   shownCount: 0,
   markCount: 0,
   secsPassed: 0,
   isSafe: false,
   isWin: false,
   isHint: false
}

var gSafe = 3


function initGame() {
   buildBoard()
   gLevel.size == 4 ? renderLives(2) : renderLives(3)
   elSmiley.innerHTML = SMILEY
   elBombs.innerHTML = `<p>${MINE}x${gLevel.mines}</p>`
}


function gameStarter(elCell, i, j) {
   startTimer()
   var minePositions = [] 
   gGame.isOn = true
   minePositions = setMinesPos(i, j)
   setMines(gBoard, minePositions)
   cellClicked(elCell, i, j)
}


function checkGame() {
   if (gGame.shownCount == (gLevel.size**2)) {
      pauseTimer()
      gGame.isWin = true
      gGame.isOn = false
      elSmiley.innerHTML = WIN_SMILEY
   }
   if (gLevel.mines == gGame.markCount) {
      pauseTimer()
      gGame.isWin = true
      gGame.isOn = false
      elSmiley.innerHTML = WIN_SMILEY
   }
   if (!gLives.length) {
      pauseTimer()
      gGame.isWin = false
      gGame.isOn = false
      elSmiley.innerHTML = DEAD_SMILEY
   }
}


function resetGame() {
   window.localStorage.removeItem('bestScore')
   gGame = {
      isOn: false,
      isWin: false,
      shownCount: 0,
      markCount: 0,
      secsPassed: 0,
   }
   gBoard = []
   gMines = []
   gLives = []
   resetTimer()
   initGame()
}


function renderLives(lives) {
   var elLives = document.querySelector('.lives')
   var strHTML = ''
   gLives = []
   for (var i = 0; i < lives; i++) {
      gLives.push(`life${i}`)
      strHTML += LIFE
   }
   elLives.innerHTML = strHTML
}