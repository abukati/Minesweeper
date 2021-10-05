'use strict'

// Board construction and individual cells functionality

var gBoard = []
var gLives = []

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
   if (gBoard[i][j].isMarked) return
   if (!gBoard[i][j].isShown && !gBoard[i][j].isMine) {
      gBoard[i][j].minesAroundCount = setMinesNegsCount(gBoard, i, j)
      if (!gBoard[i][j].minesAroundCount) {
         renderCell('', i, j)
         expandReveal(gBoard, i, j)
      } else renderCell(gBoard[i][j].minesAroundCount, i, j)
      return
   }
   if (gBoard[i][j].isMine) {
      renderCell(BLOWN_MINE, i, j)
      elSmiley.innerHTML = INJURED_SMILEY
      gLives.pop()
      renderLives(gLives.length)
      gGame.markCount++
      checkGame()
      return
   }
}


function expandReveal(board, matI, matJ) {
   if (!board[matI][matJ].isMine && !gGame.isHint) {
      for (var i = matI - 1; i <= matI + 1; i++) {
         if (i < 0 || i > gBoard.length - 1) continue
         for (var j = matJ - 1; j <= matJ + 1; j++) {
            if (i == matI && j == matJ) continue
            if (j < 0 || j > gBoard[0].length - 1) continue
            if (board[i][j].isMine) continue
            if (board[i][j].isShown) continue
            if (board[i][j].isMarked) continue
            var negCount = setMinesNegsCount(gBoard, i, j)
            gBoard[i][j].minesAroundCount = negCount
            if (negCount > 0) renderCell(negCount, i, j)
            else {
               renderCell('', i, j)
               expandReveal(gBoard, i, j)
            }
         }
      }
   }
}


function cellMarked(elCell, i, j) {
   if (!gGame.isOn) return
   if (elCell.classList.contains('clicked')) return
   if (!gBoard[i][j].isMarked) {
      gBoard[i][j].isMarked = true
      elCell.innerHTML = FLAG
      if (gBoard[i][j].isMine) gGame.markCount++
   } else {
      gBoard[i][j].isMarked = false
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