import { useState } from "react";

function Square({ value, onSquareClicked }) {
  return (
    <button className="square" onClick={onSquareClicked}>
      {value}
    </button>
  );
}

function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  console.log("body");

  let winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `the winner is: ${winner}`;
  } else {
    status = xIsNext ? `Next: X` : `Next 0`;
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    const nextSymbol = xIsNext ? "X" : "0";
    nextSquares[i] = nextSymbol;
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  return (
    <>
      <p>{status}</p>
      <div className="board-row">
        <Square value={squares[0]} onSquareClicked={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClicked={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClicked={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClicked={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClicked={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClicked={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClicked={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClicked={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClicked={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([]);

  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <ol>Game history </ol>
      </div>
    </div>
  );
}

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function calculateWinner(squares) {
  console.log("calculate winner exe");

  for (const [a, b, c] of winningLines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
