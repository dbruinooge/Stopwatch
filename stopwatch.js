const stopwatch = (() => {
  let bankedTime = 3590000;
  let startTime;
  const elapsed = (() => bankedTime + (Date.now() - startTime));

  return {
    start() {
      startTime = Date.now();
    },

    stop() {
      bankedTime = elapsed();
    },

    reset() {
      bankedTime = 0;
    },

    displayElapsed() {
      let centiseconds = (Math.floor(elapsed() / 10)) % 100;
      centiseconds = centiseconds < 10 ? `0${centiseconds}` : `${centiseconds}`;
      let seconds = Math.floor(elapsed() / 1000) % 60;
      seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      let minutes = Math.floor(elapsed() / 60000) % 60;
      minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      let hours = Math.floor(elapsed() / 3600000);
      hours = hours < 10 ? `0${hours}` : `${hours}`;
      return hours + ' : ' + minutes + ' : ' + seconds + ' : ' + centiseconds;
    }

  };
})();

document.addEventListener('DOMContentLoaded', () => {

  const display = document.querySelector('#display');
  const reset = document.querySelector('#reset');
  let intervalId;

  function handleStartClick(event) {
    event.preventDefault();
    stopwatch.start();
    intervalId = setInterval(() => {
      display.innerHTML = stopwatch.displayElapsed();
    }, 10);
    document.querySelector('#start').replaceWith(createStopButton());
  }

  function handleStopClick(event) {
    event.preventDefault();
    stopwatch.stop();
    clearInterval(intervalId);
    document.querySelector('#stop').replaceWith(createStartButton());
  }

  function handleResetClick(event) {
    event.preventDefault();
    stopwatch.reset();
    clearInterval(intervalId);
    display.innerHTML = '00 : 00 : 00 : 00';
    reset.previousElementSibling.replaceWith(createStartButton());
  }

  function createStartButton() {
    const button = document.createElement('a');
    button.href = '#';
    button.id = 'start';
    button.innerHTML = 'Start';
    button.addEventListener('click', handleStartClick);
    return button;
  }

  function createStopButton() {
    const button = document.createElement('a');
    button.href = '#';
    button.id = 'stop';
    button.innerHTML = 'Stop';
    button.addEventListener('click', handleStopClick);
    return button;
  }

  reset.parentNode.insertBefore(createStartButton(), reset);
  reset.addEventListener('click', handleResetClick);

  display.innerHTML = '00 : 00 : 00 : 00';

});