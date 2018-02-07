import React, {Component} from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

function DisplaySequence({ type, move, content }) {
  let action;
  if(type === "pickup") {

  } else if(move.movement) {
    if(move.movement.dir === "forward") {
      action = <div className="action a-forward">Forward</div>
    } else if(move.movement.dir === "right") {
      action = <div className="action a-right">Right</div>
    } else if(move.movement.dir === "left") {
      action = <div className="action a-left">Left</div>
    }
  } else if(move.pickup) {
    action = <div className="action a-function">Pickup</div>
  } else if(move.loop) {
    action =
      (<div className="action a-loop">
        Loop
        {move.loop.cmds.map((move, i) => <DisplaySequence type={type && "commands"} move={move} />)}
      </div>)
  }
  return (
    <div type={type}>
      {action}
    </div>
  );
}

export default DisplaySequence