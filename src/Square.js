import classNames from "classnames";

function Square({ value, highlightSquare, onSquareClick }) {
  const classes = classNames("square", {
    "square--winner": highlightSquare,
  });

  return (
    <button
      // className={highlightSquare ? "square square--winner" : "square"} // ternary operator
      // className={`square ${highlightSquare ? "square square--winner" : ""}`} // template literal
      // className={`square ${highlightSquare && "square square--winner"}`} // Using Conditional Chaining with &&
      className={classes}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

export default Square;
