import { useState } from "react";
import classNames from "classnames";

function Square({
  value,
  highlightSquare,
  onSquareClick,
  customClass,
  col,
  row,
}) {
  // Option style
  // const classes = classNames({
  //   square: true,
  //   "square--winner": highlightSquare,
  // });
  const classes = classNames("square", {
    "square--winner": highlightSquare,
  });

  return (
    <button
      // className="square"
      // className="square" // basic, single class
      // className={highlightSquare ? "square square--winner" : "square"} // ternary operator
      // className={`square ${highlightSquare ? "square square--winner" : ""}`} // template literal
      // className={`square ${highlightSquare && "square square--winner"}`} // Using Conditional Chaining with &&
      className={classes}
      data-class={customClass}
      onClick={onSquareClick}
      data-col={col}
      data-row={row}
    >
      {value}
    </button>
  );
}

// the boadr shoul know the location of the square
function Board({ xIsNext, squares, highlightSquares, onPlay }) {
  let winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `the winner is: ${winner}`;
  } else if (!squares.some((element) => element === null)) {
    status = `this is a draw`;
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

  const renderBoard = () => {
    const boardSize = 3;

    let renderedBoard = [];

    for (let i = 0; i < boardSize; i++) {
      let renderedSquares = [];

      for (let j = 0; j < boardSize; j++) {
        const index = i * boardSize + j;

        renderedSquares.push(
          <Square
            col={j + 1}
            row={i + 1}
            key={index}
            value={squares[index]}
            highlightSquare={highlightSquares[index]}
            onSquareClick={() => handleClick(index)}
          />
        );
      }

      renderedBoard.push(
        <div key={i} className="board-row">
          {renderedSquares}
        </div>
      );
    }

    return renderedBoard;
  };

  return (
    <>
      <p>{status}</p>
      {renderBoard()}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [highlightSquares, sethighlightSquares] = useState(Array(9).fill(null));
  const [locationSquares, setlocationSquares] = useState(Array(9).fill(null));
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares) {
    const nexStory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nexStory);
    setCurrentMove(nexStory.length - 1);

    handleHighlightedSquares(nextSquares);
  }

  function handleHighlightedSquares(nextSquares) {
    const [a, b, c] = calculateHighlightSquares(nextSquares);

    const nextHighlightValues = highlightSquares.slice();
    nextHighlightValues[a] =
      nextHighlightValues[b] =
      nextHighlightValues[c] =
        true;
    sethighlightSquares(nextHighlightValues);
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  function toggleOrder() {
    setIsAscending(!isAscending);
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

  const orderedMoves = isAscending ? moves : moves.slice().reverse();

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          highlightSquares={highlightSquares}
          onPlay={handlePlay}
        />
      </div>
      <div className="game-info">
        <button onClick={toggleOrder}>Toggle Moves ordering</button>
        <ol>{orderedMoves}</ol>
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

function calculateHighlightSquares(squares) {
  for (const [a, b, c] of winningLines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a, b, c];
    }
  }

  return [];
}
