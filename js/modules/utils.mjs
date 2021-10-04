// export { getRandNum, createMat as buildBoard, printMat as renderBoard, 
//    countNegs as setMinesNegsCount, timeToString, startTimer, pauseTimer,
//     resetTimer, print }


function getRandNum(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}


function createMat(size) {
   var mat = []
   for (var i = 0; i < size; i++) {
      mat[i] = []
      for (var j = 0; j < size; j++) {
         mat[i][j] = gCell = {
            minesAroundCount: 0,
            isShown: false,
            isMine: false,
            isMarked: false,
            isHint: false
         }
      }
   }
   return mat
}


function printMat(mat, selector) {
   var strHTML = '<table class="board-container"><tbody>'
   for (var i = 0; i < mat.length; i++) {
      strHTML += '<tr>'
      for (var j = 0; j < mat[0].length; j++) {
         var className = `cell cell-${i}-${j}`
         strHTML += `<td class="${className}" onclick="cellClicked(this, ${i}, ${j})" 
         oncontextmenu="cellMarked(this, ${i}, ${j})"></td>`
      }
      strHTML += '</tr>'
   }
   strHTML += '</tbody></table>'
   var elContainer = document.querySelector(selector)
   elContainer.innerHTML = strHTML
}


function countNegs(mat, rowIdx, colIdx) {
   var count = 0
   for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
      if (i < 0 || i > mat.length - 1) {
         continue
      }
      for (var j = colIdx - 1; j <= colIdx + 1; j++) {
         if (j < 0 || j > mat[0].length - 1) {
            continue
         }
         if (i === rowIdx && j === colIdx) continue
         if (mat[i][j] === live) count++
      }
   }
   return count
}


function timeToString(time) {
   var diffInHrs = time / 3600000
   var hh = Math.floor(diffInHrs)
 
   var diffInMin = (diffInHrs - hh) * 60
   var mm = Math.floor(diffInMin)
 
   var diffInSec = (diffInMin - mm) * 60
   var ss = Math.floor(diffInSec)
 
   var diffInMs = (diffInSec - ss) * 100
   var ms = Math.floor(diffInMs)
   
   var formattedMM = mm.toString().padStart(2, '0')
   var formattedSS = ss.toString().padStart(2, '0')

   gGame.secsPassed = ss
   
   return `${formattedMM}:${formattedSS}`
}

var startTime
var elapsedTime = 0
var timerInterval

function print(txt) {
   document.querySelector('.timer').innerHTML = txt
}

function startTimer() {
   startTime = Date.now() - elapsedTime
   timerInterval = setInterval(() => {
      checkGame()
      elapsedTime = Date.now() - startTime
      print(timeToString(elapsedTime))
   })
}

function pauseTimer() {
   clearInterval(timerInterval)
   timerInterval = null
}

function resetTimer() {
   clearInterval(timerInterval)
   print('00:00')
   elapsedTime = 0
   timerInterval = null
}