'use strict'

function initGame() {
   buildBoard()
}


function gameStarter(elCell, i, j) {
   startTimer()
   var minePositions = [] 
   minePositions = setMinesPos(i, j)
   gGame.isOn = true
   setMines(gBoard, minePositions)
   cellClicked(elCell, i, j)
}


function checkGame() {
   if (gGame.shownCount == (gLevel.size**2)) {
      pauseTimer()
      gGame.isWin = true
      gGame.isOn = false
   }
   if (gLevel.mines == gGame.markCount) {
      pauseTimer()
      gGame.isWin = true
      gGame.isOn = false
   }
}


