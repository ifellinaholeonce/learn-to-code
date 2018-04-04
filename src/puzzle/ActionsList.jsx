import React, {Component} from 'react';
import Dragula from 'react-dragula';
import DisplaySequence from './DisplaySequence.jsx';

function ActionsList({commands, items}) {
  return (
    <div className="available-actions command-list drake-container" id="left">
      {commands.map((move, i) =>
          <DisplaySequence type="action" key={i} move={move} />
        )}
      {items.map((item, i) => {
        return (<DisplaySequence type="pickup" key={i} move={null} content={item} />)
      })}
      <div className="looper action a-loop" id="loop">
        Loop
        <div className="looper-container drake-container"></div>
      </div>
      <div className="looper action a-function" id="pickup">
        Pick Up
        <div className="looper-container drake-container" id="pickup"></div>
      </div>
    </div>
  )
}

export default ActionsList