import React from "react";

const Tile = props => {
  const inputClassName =
    props.tile.length > 6
      ? `tileInputSmall`
      : props.tile.length > 3
      ? `tileInputMedium`
      : `tileInputLarge`;

  return (
    <div className="Tile">
      <input
        className={inputClassName}
        type="number"
        min="1"
        max="9"
        id={props.id}
        tile={props.tile}
        disabled={props.disabled}
        value={!isNaN(props.tile) ? props.tile : ""}
        onChange={props.onChange}
        // {...props}
      />
    </div>
  );
};

export default Tile;
