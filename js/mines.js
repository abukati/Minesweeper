'use strict'

// Board mining configuration

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


function setMinesNegsCount(mat, rowIdx, colIdx) {
   var count = 0
   for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
      if (i < 0 || i > mat.length - 1) continue
      for (var j = colIdx - 1; j <= colIdx + 1; j++) {
         if (j < 0 || j > mat[0].length - 1) continue
         if (i == rowIdx && j == colIdx) continue
         if (mat[i][j].isMine) count++
      }
   }
   return count
}