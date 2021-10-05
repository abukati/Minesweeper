'use strict'

// Game progression control functions

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
   // renderSafeClick()
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


// function renderSafeClick() {
//    var elSafeBtn = document.querySelector('.safe-click')
//    elSafeBtn.innerHTML = `<button class="safe-btn" onclick="safeClickMode()">Safe Click</button>\n<p>${gSafe} clicks available</p>`
// }