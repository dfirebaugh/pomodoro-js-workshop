
/*
  This file accepts the configuration via url parameters.
  All of the controls are hidden because you can now configure
  the pomodoro clock via url params.

  the values are in seconds
  e.g. /index.html?work=10&break=5
*/

const adders = document.getElementById("adders");
adders.style.display = "flex";

// Selecting DOM elements
const workTimeView = document.getElementById("workTime");
const addWork = document.getElementById("addWorkTime");
const subtractWork = document.getElementById("subtractWork");

const breakTimeView = document.getElementById("breakTime");
const addBreak = document.getElementById("addBreak");
const subtractBreak = document.getElementById("subtractBreak");

const ticker = document.getElementById("ticker");
const playToggleBtn = document.getElementById("pause");

const status = document.getElementById("status");

function hideElements() {
  adders.style.display = "none";
  playToggleBtn.style.display = "none";
}

// hiding elements because we can now conif via url params
//  we could have removed the elements from index.hmtl, but 
//  hiding them keeps the other js files from breaking
hideElements();

// Parse URL query parameters
const queryParams = new URLSearchParams(window.location.search);
const workTimeParam = parseInt(queryParams.get('work'), 10);
const breakTimeParam = parseInt(queryParams.get('break'), 10);

// Initial state with values from URL parameters or fallback to defaults
const state = {
  workTime: isNaN(workTimeParam) ? 30 : workTimeParam,
  breakTime: isNaN(breakTimeParam) ? 15 : breakTimeParam,
  time: 0,
  paused: false,
  working: true
};

let { workTime, breakTime, time, paused, working } = state;

// Update display times
const updateTimes = () => {
  breakTimeView.innerHTML = breakTime;
  workTimeView.innerHTML = workTime;
};

// Increment and decrement functions
const inc = (timeType) => {
  timeType === "workTime" ? workTime++ : breakTime++;
  updateTimes();
};

const dec = (timeType) => {
  timeType === "workTime" ? workTime-- : breakTime--;
  updateTimes();
};

// Event Listeners
playToggleBtn.addEventListener("click", () => {
  paused = !paused;
  if (paused) document.body.style.background = "grey";
});
addWork.addEventListener("click", () => inc("workTime"));
subtractWork.addEventListener("click", () => dec("workTime"));
addBreak.addEventListener("click", () => inc("breakTime"));
subtractBreak.addEventListener("click", () => dec("breakTime"));

// Timer refresh function
const refresh = () => {
  if (!paused) {
    if (working) {
      if (time >= workTime) {
        working = false;
        time = 0;
      }
    } else {
      if (time >= breakTime) {
        working = true;
        time = 0;
      }
    }

    time++;
    document.body.style.background = working ? "skyblue" : "orangered";
    ticker.style.color = working ? "orangered" : "skyblue";
    ticker.innerHTML = time;
    status.innerHTML = working ? "Do work things" : "Take it Easy!!!";
  }
};

const tick = () => setInterval(refresh, 1000);

// Initialize
updateTimes();
tick();