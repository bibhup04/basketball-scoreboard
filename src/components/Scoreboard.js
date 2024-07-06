import React, { useState, useEffect, useRef } from "react";
import "./Scoreboard.css";

const Scoreboard = () => {
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [homeTO, setHomeTO] = useState(0);
  const [awayTO, setAwayTO] = useState(0);
  const [homeFO, setHomeFO] = useState(0);
  const [awayFO, setAwayFO] = useState(0);
  const [time, setTime] = useState(60); // default 1 minute (60 seconds)
  const [isRunning, setIsRunning] = useState(false);
  const [period, setPeriod] = useState(1);
  const timerRef = useRef(null);

  const handleScoreChange = (team, points) => {
    if (team === "home") {
      setHomeScore(homeScore + points);
    } else if (team === "away") {
      setAwayScore(awayScore + points);
    }
  };

  const handleTOChange = (team, value) => {
    if (team === "home") {
      setHomeTO(homeTO + value);
    } else if (team === "away") {
      setAwayTO(awayTO + value);
    }
  };

  const handleFOChange = (team, value) => {
    if (team === "home") {
      setHomeFO(homeFO + value);
    } else if (team === "away") {
      setAwayFO(awayFO + value);
    }
  };

  const handleResetScores = () => {
    setHomeScore(0);
    setAwayScore(0);
    setHomeTO(0);
    setAwayTO(0);
    setHomeFO(0);
    setAwayFO(0);
  };

  const handleStartTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const handlePauseTimer = () => {
    setIsRunning(false);
  };

  const handleResetTimer = () => {
    setIsRunning(false);
    setTime(60);
  };

  const handleIncreaseTime = () => {
    setTime((prevTime) => prevTime + 60);
  };

  const handleDecreaseTime = () => {
    if (time > 60) {
      setTime((prevTime) => prevTime - 60);
    }
  };

  useEffect(() => {
    if (isRunning && time > 0) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
      setPeriod((prevPeriod) => prevPeriod + 1);
      setTime(60);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, time]);

  return (
    <div className="scoreboard">
      <h1>Basketball Scoreboard</h1>
      <div className="teams">
        <div className="team">
          <h2>Home</h2>
          <div className="score">{homeScore}</div>
          <button onClick={() => handleScoreChange("home", 1)}>+1</button>
          <button onClick={() => handleScoreChange("home", 2)}>+2</button>
          <button onClick={() => handleScoreChange("home", 3)}>+3</button>
          <div className="stats">
            <div className="stat">
              <h3>TO: {homeTO}</h3>
              <button onClick={() => handleTOChange("home", 1)}>+1</button>
              <button onClick={() => handleTOChange("home", -1)}>-1</button>
            </div>
            <div className="stat">
              <h3>FO: {homeFO}</h3>
              <button onClick={() => handleFOChange("home", 1)}>+1</button>
              <button onClick={() => handleFOChange("home", -1)}>-1</button>
            </div>
          </div>
        </div>
        <div className="timer">
          <h2>Period: {period}</h2>
          <div className="time" style={{ fontSize: "48px" }}>{`${Math.floor(
            time / 60
          )}:${time % 60 < 10 ? `0${time % 60}` : time % 60}`}</div>
          <div>
            <button onClick={handleDecreaseTime}>-1 min</button>
            <button onClick={handleIncreaseTime}>+1 min</button>
          </div>
          {isRunning ? (
            <button onClick={handlePauseTimer}>Pause</button>
          ) : (
            <button onClick={handleStartTimer}>Start</button>
          )}
          <button onClick={handleResetTimer}>Reset Timer</button>
        </div>
        <div className="team">
          <h2>Away</h2>
          <div className="score">{awayScore}</div>
          <button onClick={() => handleScoreChange("away", 1)}>+1</button>
          <button onClick={() => handleScoreChange("away", 2)}>+2</button>
          <button onClick={() => handleScoreChange("away", 3)}>+3</button>
          <div className="stats">
            <div className="stat">
              <h3>TO: {awayTO}</h3>
              <button onClick={() => handleTOChange("away", 1)}>+1</button>
              <button onClick={() => handleTOChange("away", -1)}>-1</button>
            </div>
            <div className="stat">
              <h3>FO: {awayFO}</h3>
              <button onClick={() => handleFOChange("away", 1)}>+1</button>
              <button onClick={() => handleFOChange("away", -1)}>-1</button>
            </div>
          </div>
        </div>
      </div>
      <button className="reset-button" onClick={handleResetScores}>
        Reset Scores
      </button>
    </div>
  );
};

export default Scoreboard;
