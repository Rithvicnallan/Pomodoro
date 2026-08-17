console.log("connected");

let state = "idle"; // idle / playing / paused
let mode;  // work / shortBreak / longBreak

const DURATIONS = {
  work: 25 * 60 * 1000,
  shortBreak: 5 * 60 * 1000,
  longBreak: 15 * 60 * 1000,
};

const display = document.getElementById("time-display");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const skipBtn = document.getElementById("skip");

const pomodoroBtn = document.getElementById("pomodoro");
const shortBreakBtn = document.getElementById("shortBreak");
const longBreakBtn = document.getElementById("longBreak");

let intervalID;
let endTime;
let timeRemaining;

pomodoroBtn.addEventListener("click", pomodoroFunction);
function pomodoroFunction() {
  mode = "work";
  updateUI()
}

shortBreakBtn.addEventListener("click", shortBreakFunction);
function shortBreakFunction() {
  mode = "shortBreak";
  updateUI()
}

longBreakBtn.addEventListener("click", longBreakFunction);
function longBreakFunction() {
  mode = "longBreak";
  updateUI()
}




updateUI();
// START BUTTON
startBtn.addEventListener("click", startFunction);
function startFunction() {
  if (state === "playing") return;
  console.log("Start Clicked");
  if (state === "paused") {
    endTime = Date.now() + timeRemaining;
  } else {
    const duration = DURATIONS[mode];
    endTime = Date.now() + (duration);
  }
    tick();
    intervalID = setInterval(tick, 1000);
    state = "playing";
  updateUI();
}


function tick() {
  const timeRemaining = endTime - Date.now();
  const totalSeconds = Math.ceil(timeRemaining / 1000);
  const minutesRemaining = Math.floor(totalSeconds / 60);
  const secondsRemaining = totalSeconds % 60;

  const paddedMinutes = String(minutesRemaining).padStart(2, "0");
  const paddedSeconds = String(secondsRemaining).padStart(2, "0");
  display.textContent = `${paddedMinutes}:${paddedSeconds}`;
}

pauseBtn.addEventListener("click", pauseFunction);
function pauseFunction() {
  if (state !== "playing") return;
  console.log("Pause Clicked");
  timeRemaining = endTime - Date.now();
  clearInterval(intervalID);
  state = "paused";
  updateUI();
}

function updateUI() {
  if (mode === "work") {
    pomodoroBtn.classList.add("selectedBtn");
    shortBreakBtn.classList.remove("selectedBtn");
    longBreakBtn.classList.remove("selectedBtn");
    display.textContent = "25:00"
  } else if (mode === "shortBreak") {
    pomodoroBtn.classList.remove("selectedBtn");
    shortBreakBtn.classList.add("selectedBtn");
    longBreakBtn.classList.remove("selectedBtn");
    display.textContent = "05:00"
  } else if (mode === "longBreak") {
    pomodoroBtn.classList.remove("selectedBtn");
    shortBreakBtn.classList.remove("selectedBtn");
    longBreakBtn.classList.add("selectedBtn");
    display.textContent = "15:00"
  }


  if (state === "idle") {
    startBtn.classList.remove("hidden");
    pauseBtn.classList.add("hidden");
    resetBtn.classList.add("hidden");
    skipBtn.classList.add("hidden");
    startBtn.textContent = "Start";
  } else if (state === "playing"){
    startBtn.classList.add("hidden");
    pauseBtn.classList.remove("hidden");
    resetBtn.classList.remove("hidden");
    skipBtn.classList.remove("hidden");
  } else if (state === "paused") {
    startBtn.classList.remove("hidden");
    pauseBtn.classList.add("hidden");
    resetBtn.classList.remove("hidden");
    skipBtn.classList.remove("hidden");
    startBtn.textContent = "Resume";
  }
}
