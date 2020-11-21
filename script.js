const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const wpm = document.querySelector(".wpmcalcarea");

var timer = [0,0,0,0];
var interval;
var timerRunning = false;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function addZero(time) {
  if (time <= 9) {
    time = "0" + time;
  }
  return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
  let currentTime = addZero(timer[0]) + ":" + addZero(timer[1]) + ":" + addZero(timer[2]);
  theTimer.innerHTML = currentTime;
  timer[3]++;

  timer[0] = Math.floor((timer[3]/100)/60);
  timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
  timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// Match the text entered with the provided text on the page:
function spellCheck() {
  let textEntered = testArea.value;
  let originTextMatch = originText.substring(0,textEntered.length);

  if (textEntered == originText) {
    clearInterval(interval);
    testWrapper.style.borderColor = "#7FFF00";
    return wpmCalculation();
  } else {
    if (textEntered == originTextMatch) {
      testWrapper.style.borderColor = "#00CED1";
    } else {
      testWrapper.style.borderColor = "#ff0000";
    }
  }
}

// Start the timer:
function start() {
  let textEnterdLength = testArea.value.length;
  if (textEnterdLength === 0 && !timerRunning) {
    timerRunning = true;
    interval = setInterval(runTimer, 10);
  }
}

// Reset everything:
function reset() {
  clearInterval(interval);
  interval = null;
  timer = [0,0,0,0];
  timerRunning = false;

  wpm.innerHTML = "Finish the test to find out your WPM!";
  testArea.value = "";
  theTimer.innerHTML = "00:00:00";
  testWrapper.style.borderColor = "grey";
}

function wpmCalculation() {
  let textEnterdLength = testArea.value.length;
  let numOfWords = (textEnterdLength/5);
  let minsIntoSecs = ((timer[0] * 60) + timer[1]);
  let wpmInMins = (numOfWords/minsIntoSecs)*60;
  let wpmResult = wpmInMins.toFixed(2);

  wpm.innerHTML = "Great job! Your WPM is: " + wpmResult + " words per minute.";

}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
