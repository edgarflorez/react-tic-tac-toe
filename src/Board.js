import Square from "./Square";
import { calculateWinner } from "./utils";

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

  function _handleClick(i, col, row) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "0";
    onPlay(nextSquares, col, row);
  }

  const _boarTemplate = () => {
    const boardSize = 3;

    let renderedBoard = [];

    for (let i = 0; i < boardSize; i++) {
      let renderedSquares = [];

      for (let j = 0; j < boardSize; j++) {
        const index = i * boardSize + j;

        renderedSquares.push(
          <Square
            key={index}
            value={squares[index]}
            highlightSquare={highlightSquares[index]}
            onSquareClick={() => _handleClick(index, j + 1, i + 1)}
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
      {_boarTemplate()}
    </>
  );
}
export default Board;
