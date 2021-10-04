'use strict'


function setMinesPos(matI, matJ) {
   for (var i = 0; i < gLevel.mines; i++) {
      var cell = {
         i: getRandNum(0, gLevel.size - 1),
         j: getRandNum(0, gLevel.size - 1)
      }
      if (!gGame.isOn) {
         while (matI == cell.i && matJ == cell.j) {
            cell.i = getRandNum(0, gLevel.size - 1)
            cell.j = getRandNum(0, gLevel.size - 1)
         }
      }
      gMines.push(cell)
   }
   return gMines
}


function setMines(board, minesPos) {
   for (var i = 0; i < minesPos.length ; i++) {
      board[minesPos[i].i][minesPos[i].j].isMine = true
   }
}


function setMinesNegsCount(cellI, cellJ) {
   var negCount = 0
   for (var i = cellI - 1; i <= cellI + 1; i++) {
      if (i < 0 || i >= gBoard.length) continue
      for (var j = cellJ - 1; j <= cellJ + 1; j++) {
         if (i === cellI && j === cellJ) continue
         if (j < 0 || j >= gBoard[i].length) continue
         if (gBoard[i][j].isMine) negCount++
      }
   }
   return negCount
}