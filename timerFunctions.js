// import { secondsLabel, minutesLabel } from './script.js';
// import { timerStarted } from './script.js';
// import { timerInterval } from './script.js';
// import { totalSeconds } from './script.js';

// const startTimer = () => {
//   timerStarted = true;
//   console.log('entrou na startTimer');
//   totalSeconds = 0;
//   // setInterval(setTime, 1000);
//   timerInterval = setInterval(setTime, 1000);
// }

// const clearTimer = () => {
//   timerStarted = false;
//   totalSeconds = 0;
//   console.log('entrou na clearTimer');
//   clearInterval(timerInterval)
//   secondsLabel.innerHTML = pad(totalSeconds % 60) + 's';
//   minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60)) + 'min';
// }


// function setTime() {
//   console.log('entrou na setTime');
//   totalSeconds += 1;
//   secondsLabel.innerHTML = pad(totalSeconds % 60) + 's';
//   minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60)) + 'min';
// }

// function pad(val) {
//   let valString = val + "";
//   if (valString.length < 2) {
//     return "0" + valString;
//   } else {
//     return valString;
//   }
// }

// export { startTimer, clearTimer, setTime, pad }