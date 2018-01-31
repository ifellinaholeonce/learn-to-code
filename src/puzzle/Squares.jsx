import React, {Component} from 'react';

function Square({type, x, y, player, dir}) {
  switch (dir) {
    case 1:
      dir = "north"
      break;
    case 2:
      dir = "east"
      break;
    case 3:
      dir = "south"
      break;
    case 4:
      dir = "west"
      break;
    default:

  }
  return (
    <div className="square">
      <div className={type}></div>
    </div>
  )
}

export default Square;
