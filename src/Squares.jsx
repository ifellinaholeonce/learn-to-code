import React, {Component} from 'react';

function Square({type, x, y}) {
  return (
    <div className={`${type} x-${x} y-${y} square`}>
      <div>
      </div>
    </div>
  )
}

export default Square;