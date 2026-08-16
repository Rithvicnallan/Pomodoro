console.log("connected");

let state = "idle"; // idle / playing / paused
let mode = "work"; // work / shortBreak / longBreak

const DURATIONS = {
  work: 25 * 60 * 1000,
  shortBreak: 5 * 60 * 1000,
  longBreak: 15 * 60 * 1000,
};

const display = document.getElementById("time-display");
let intervalID;
let endTime;
let timeRemaining;

// START BUTTON
document.getElementById("start").addEventListener("click", startFunction);
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

document.getElementById("pause").addEventListener("click", pauseFunction);
function pauseFunction() {
  if (state !== "playing") return;
  console.log("Pause Clicked");
  timeRemaining = endTime - Date.now();
  clearInterval(intervalID);
  state = "paused";
}
