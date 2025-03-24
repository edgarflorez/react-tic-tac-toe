import { useState } from "react";
import Board from "./Board";
import { calculateHighlightSquares } from "./utils";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [highlightSquares, sethighlightSquares] = useState(Array(9).fill(null));
  const [locationSquares, setlocationSquares] = useState([]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function _handlePlay(nextSquares, col, row) {
    const nexStory = [...history.slice(0, currentMove + 1), nextSquares];
    const nextLocation = [...locationSquares];
    nextLocation[currentMove] = { col: col, row: row };

    setHistory(nexStory);
    setlocationSquares(nextLocation);
    setCurrentMove(nexStory.length - 1);

    _handleHighlightedSquares(nextSquares);
  }

  function _handleHighlightedSquares(nextSquares) {
    const [a, b, c] = calculateHighlightSquares(nextSquares);

    const nextHighlightValues = highlightSquares.slice();
    nextHighlightValues[a] =
      nextHighlightValues[b] =
      nextHighlightValues[c] =
        true;
    sethighlightSquares(nextHighlightValues);
  }

  function _jumpTo(move) {
    setCurrentMove(move);
  }

  function _toggleOrder() {
    setIsAscending(!isAscending);
  }

  const _moves = history.map((squares, move) => {
    let moveTemplate;

    if (move === currentMove) {
      moveTemplate = `You are at move #${move + 1}`;
    } else {
      let buttonDescription;
      let locationSquareString = "";

      const { col, row } = locationSquares[move] || { col: null, row: null };

      if ((col, row)) {
        locationSquareString = `- Column ${col} | Row ${row}`;
      }

      if (move > 0) {
        buttonDescription = `Go to move #${move + 1} ${locationSquareString}`;
      } else {
        buttonDescription = `Go to Game Start ${locationSquareString}`;
      }
      moveTemplate = (
        <button onClick={() => _jumpTo(move)}>{buttonDescription}</button>
      );
    }

    return <li key={move}>{moveTemplate}</li>;
  });

  const _orderedMoves = isAscending ? _moves : _moves.slice().reverse();

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          highlightSquares={highlightSquares}
          onPlay={_handlePlay}
        />
      </div>
      <div className="game-info">
        <button onClick={_toggleOrder}>Toggle Moves ordering</button>
        <ol>{_orderedMoves}</ol>
      </div>
    </div>
  );
}
