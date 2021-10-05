function getRandNum(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}


function getNeighbors(cell) {
   var row = parseInt(cell.id[0])
   var col = parseInt(cell.id[1])
   var negs = []
   negs.push((row - 1) + '' + (col - 1))
	negs.push((row - 1) + '' + col)
	negs.push((row - 1) + '' + (col + 1))
	negs.push(row + '' + (col - 1))
	negs.push(row + '' + (col + 1))
	negs.push((row + 1) + '' + (col - 1))
	negs.push((row + 1) + '' + col)
	negs.push((row + 1) + '' + (col + 1))
   
   for (var i = 0; i < negs.length; i++) {
      if (negs[i].length > 2) {
         negs.splice(i, 1)
         i--
      }
   }
   return negs
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
         strHTML += `<td class="${className}" id="${i}${j}" onclick="cellClicked(this, ${i}, ${j})" 
         oncontextmenu="cellMarked(this, ${i}, ${j})"></td>`
      }
      strHTML += '</tr>'
   }
   strHTML += '</tbody></table>'
   var elContainer = document.querySelector(selector)
   elContainer.innerHTML = strHTML
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
      elapsedTime = Date.now() - startTime
      print(timeToString(elapsedTime))
   })
}

function pauseTimer() {
   clearInterval(timerInterval)
   if (gGame.isWin) {
      if (localStorage.getItem('bestScore') == null) {
         localStorage.setItem('bestScore', elapsedTime)
         elBestScores.innerHTML = `<li>${timeToString(elapsedTime)}</li>`
      }
      if (localStorage.getItem('bestScore') > elapsedTime && localStorage.length <= 3) {
         localStorage.setItem('bestScore', elapsedTime)
         elBestScores.innerHTML += `<li>${timeToString(elapsedTime)}</li>`
      }
   }
   timerInterval = null
}

function resetTimer() {
   clearInterval(timerInterval)
   print('00:00')
   elapsedTime = 0
   timerInterval = null
}