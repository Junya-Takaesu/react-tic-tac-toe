import React, { useState } from "react";
import { calculateWinner } from "../helper";
import Board from "./Board";

const Game = () => {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
      coordinates: { row: null, col: null },
    },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(history[stepNumber].squares);
  const xO = xIsNext ? "X" : "O";

  const handleClick = i => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const squares = [...historyPoint[stepNumber].squares];
    // return if won or occupied
    if (winner || squares[i]) return;
    // select square
    squares[i] = xO;
    const historyObj = {
      squares: squares,
      coordinates: { row: Math.floor(i / 3), col: i % 3 },
    };
    setHistory([...historyPoint, historyObj]);
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext);
  };

  const jumpTo = step => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  const renderMoves = currentStep =>
    history.map((_step, move) => {
      const destination = move ? `Go to move #${move}` : "Go to Start";
      const colCoordinate = _step.coordinates.col;
      const rowCoordinate = _step.coordinates.row;
      const coordinates =
        rowCoordinate != null && colCoordinate != null
          ? `(${colCoordinate}, ${rowCoordinate})`
          : "";
      return (
        <li kye={move}>
          <button
            onClick={() => jumpTo(move)}
            className={move === currentStep ? "current" : ""}
          >
            {destination} {coordinates}
          </button>
        </li>
      );
    });

  return (
    <>
      <h1>React Tic Tac Toe - With Hooks</h1>
      <div className="game-wrapper">
        <h2>{winner ? "Winner: " + winner : "Next Player: " + xO}</h2>
        <Board squares={history[stepNumber].squares} onClick={handleClick} />
        <div className="info-wrapper">
          <div>
            <h3>History</h3>
            {renderMoves(stepNumber)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Game;
