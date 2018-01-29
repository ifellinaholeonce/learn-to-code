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
      {player &&
      <div className={"player " + dir}>
        <div className="player-top"></div>
        {( dir === "east" || dir === "south" ) &&
          <div className="player-eye-right"></div>
        }
        {( dir === "west" || dir === "south" ) &&
          <div className="player-eye-left"></div>
        }
        <div className="player-bottom"></div>
        <div className="player-feet"></div>
      </div>
      }
    </div>
  )
}

export default Square;
