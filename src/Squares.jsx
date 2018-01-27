import React, {Component} from 'react';

function Square({type, x, y, player}) {
  return (
    <div className={`x-${x} y-${y} square`}>
      <div className={type}></div>
      {player &&
      <div className="player">
        <div className="player-top"></div>
        <div className="player-bottom"></div>
        <div className="player-feet"></div>
      </div>
      }
    </div>
  )
}

export default Square;
