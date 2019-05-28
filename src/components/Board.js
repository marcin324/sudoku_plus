import React from "react";
import Tile from "./Tile";

const Board = props => {
  const board = props.board.map((tile, id) => (
    <Tile
      type="number"
      min="1"
      max="9"
      key={id}
      id={id}
      tile={tile}
      value={!isNaN(tile) ? tile : ""}
      onChange={e => props.updateBoard(e, id)}
      disabled={props.initialBoard[id] !== "." ? true : false}
    />
  ));
  return <div className="Board">{board}</div>;
};

export default Board;
