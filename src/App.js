import './App.css';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faMinus,
  faPlay,
  faPause,
  faRedo,
} from '@fortawesome/free-solid-svg-icons';

function App() {
  // useStates
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [play, setPlay] = useState(false);
  const [timingType, setTimingType] = useState('SESSION');
  const [timeLeft, setTimeLeft] = useState(1500);

  // timeout
  const timeout = setTimeout(() => {
    if (timeLeft && play) {
      setTimeLeft(timeLeft - 1);
    }
  }, 1000);

  // Handle Functions
  const handleBreakIncrease = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const handleBreakDecrease = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const handleSessionIncrease = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTimeLeft(timeLeft + 60);
    }
  };

  const handleSessionDecrease = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimeLeft(timeLeft - 60);
    }
  };

  const handlePlay = () => {
    clearTimeout(timeout);
    setPlay(!play);
    // if(play){
    //   setPlay(false)
    // } else{
    //   setPlay(true)
    // }
  };

  const handleReset = () => {
    clearTimeout(timeout);
    setPlay(false);
    setTimeLeft(1500);
    setBreakLength(5);
    setSessionLength(25);
    setTimingType('SESSION');
    const audio = document.getElementById('beep');
    audio.pause();
    audio.currentTime = 0;
  };

  // Time Formatter
  const timeFormatter = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const resetTimer = () => {
    const audio = document.getElementById('beep');
    if (!timeLeft && timingType === 'SESSION') {
      setTimeLeft(breakLength * 60);
      setTimingType('BREAK');
      audio.play();
    }

    if (!timeLeft && timingType === 'BREAK') {
      setTimeLeft(breakLength * 60);
      setTimingType('SESSION');
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const clock = () => {
    if (play) {
      // eslint-disable-next-line no-unused-expressions
      timeout;
      resetTimer();
    } else {
      clearTimeout(timeout);
    }
  };

  useEffect(() => {
    clock();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play, timeLeft, timeout]);

  // dummy function below - acts like the "pass" in python for functions.
  // const { play, handleBreakIncrease, handleBreakDecrease, handleSessionIncrease, handleSessionDecrease, timeFormatter, title, handlePlay, handleReset } = {};

  const title = timingType === 'SESSION' ? 'Session' : ' Break';

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <h2>25 + 5 Clock</h2>
        </div>
        <div className="controls-container">
          <div className="break-session-length">
            <h3 id="break-label">Break Length</h3>
            <div className="button-container">
              <button
                disbaled={play}
                onClick={handleBreakIncrease}
                id="break-increment"
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
              <p id="break-length">{breakLength}</p>
              <button
                disabled={play}
                onClick={handleBreakDecrease}
                id="break-decrement"
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
            </div>
          </div>
          <div className="session-length-section">
            <h3 id="session-label">Session Length</h3>
            <div className="button-container">
              <button
                disbaled={play}
                onClick={handleSessionIncrease}
                id="session-increment"
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
              <p id="session-length">{sessionLength}</p>
              <button
                disabled={play}
                onClick={handleSessionDecrease}
                id="session-decrement"
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
            </div>
          </div>
        </div>
        <div className="timer-container">
          <div className="timer">
            <h2 id="timer-label">{title}</h2>
            <p id="time-left">{timeFormatter()}</p>
          </div>
          <div className="timer-buttons">
            <button onClick={handlePlay} id="start_stop">
              <FontAwesomeIcon icon={faPlay} /> /{' '}
              <FontAwesomeIcon icon={faPause} />
            </button>
            <button onClick={handleReset} id="reset">
              <FontAwesomeIcon icon={faRedo} />
            </button>
          </div>
        </div>
      </div>
      <audio
        id="beep"
        preload="auto"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
}

export default App;
