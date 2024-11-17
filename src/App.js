import { useState } from "react";

function Square({ value, onSquareClicked }) {
  return (
    <button className="square" onClick={onSquareClicked}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
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
    nextSquares[i] = xIsNext ? "X" : "0";
    onPlay(nextSquares);
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
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares) {
    const nexStory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nexStory);
    setCurrentMove(nexStory.length - 1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  const moves = history.map((squares, move) => {
    let moveTemplate;
    if (move === currentMove) {
      moveTemplate = `You are at move #${move}`;
    } else {
      let buttonDescription;
      if (move > 0) {
        buttonDescription = `Go to move #${move}`;
      } else {
        buttonDescription = "Go to Game Start";
      }
      moveTemplate = (
        <button onClick={() => jumpTo(move)}>{buttonDescription}</button>
      );
    }

    return <li key={move}>{moveTemplate}</li>;
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
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
  for (const [a, b, c] of winningLines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
