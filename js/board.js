'use strict'
// import { getRandNum, buildBoard, renderBoard, setMinesNegsCount,
//    timeToString, startTimer, pauseTimer, resetTimer, print } from './modules/utils.mjs';



function buildBoard() {
   gBoard = createMat(gLevel.size)
   printMat(gBoard, '.game-board')
}


function cellClicked(elCell, i, j) {
   if (!gGame.isOn && !gGame.shownCount) {
      gameStarter(elCell, i, j)
      return
   }
   if (!gGame.isOn) return
   if (elCell.classList.contains('clicked')) return
   if (gBoard[i][j].isMark) return
   if (gBoard[i][j].isHint) return
   if (gGame.isSafe) {
      var negsVal = setMinesNegsCount(i, j)
      renderCell(negsVal, i, j)
      gGame.isSafe = false
      gBoard[i][j].isShown = true
      if (gBoard[i][j].isMine) gGame.markCount++
   }
   if (!gBoard[i][j].isShown && !gBoard[i][j].isMine) {
      gBoard[i][j].minesAroundCount = setMinesNegsCount(i, j)
      if (!gBoard[i][j].minesAroundCount) {
         renderCell('', i, j)

      } else renderCell(gBoard[i][j].minesAroundCount, i, j)
      return
   }
   if (gBoard[i][j].isMine) {
      renderCell(MINE, i, j)
      // gLives.pop()
      gGame.markCount++
      // gGame.shownCount++
      return
   }
}


function cellMarked(elCell, i, j) {
   // var elFlags = document.querySelector('.flags')
   if (!gGame.isOn) return
   if (elCell.classList.contains('clicked')) return
   if (!gBoard[i][j].isMark) {
      gBoard[i][j].isMark = true
      elCell.innerHTML = FLAG
      if (gBoard[i][j].isMine) gGame.markCount++
   } else {
      gBoard[i][j].isMark = false
      elCell.innerText = ''
      if (gBoard[i][j].isMine) gGame.markCount--
   }
}


function renderCell(value, i, j) {
   var elCell = document.querySelector(`.cell-${i}-${j}`)
   elCell.classList.add('clicked')
   gBoard[i][j].isShown = true
   gGame.shownCount++
   elCell.innerHTML = (value == 0) ? '' : value
}