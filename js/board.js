'use strict'

// Board construction and individual cells functionality

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
   // if (gGame.isHint) return
   // if (gGame.isSafe) {
   //    var negsVal = setMinesNegsCount(gBoard, i, j)
   //    renderCell(negsVal, i, j)
   //    gBoard[i][j].isShown = true
   //    renderSafeClick()
   //    if (gBoard[i][j].isMine) gGame.markCount++
   //    setTimeout(() => gGame.isSafe = false, 2000)
   //    return
   // }
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


function expandReveal(board, matI, matJ) {
   if (!board[matI][matJ].isMine && !gGame.isHint) {
      for (var i = matI - 1; i <= matI + 1; i++) {
         if (i < 0 || i > gBoard.length - 1) continue
         for (var j = matJ - 1; j <= matJ + 1; j++) {
            if (i == matI && j == matJ) continue
            if (j < 0 || j > gBoard[0].length - 1) continue
            if (board[j][j].isMine) continue
            if (board[j][j].isShown) continue
            if (board[j][j].isMark) continue
            var negCount = setMinesNegsCount(gBoard, i, j)
            gBoard[i][j].minesAroundCount = negCount
            if (negCount > 0) renderCell(negCount, i, j)
            else {
               renderCell('', i, j)
               // expandReveal(gBoard, i, j)
            }
         }
      }
   }
}


function renderCell(value, i, j) {
   var elCell = document.querySelector(`.cell-${i}-${j}`)
   elCell.classList.add('clicked')
   gBoard[i][j].isShown = true
   gGame.shownCount++
   elCell.innerHTML = (value == 0) ? '' : value
}


// function safeClickMode() {
//    if (gSafe > 0) {
//       gGame.isSafe = true
//       gSafe--
//    } else {
//       var elSafeBtn = document.querySelector('.safe-click')
//       elSafeBtn = `<button style="cursor:not-allowed;" class="safe-btn" onclick="safeClickMode()" disabled>Safe Click</button>`
//    }
// }