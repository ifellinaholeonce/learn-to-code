import React, {Component} from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

function DisplaySequence({ type, move, i }) {
  let action;
  if(move.movement) {
    if(move.movement.dir === "forward") {
      action = <div key={i} className="action a-forward">Forward</div>
    } else if(move.movement.dir === "right") {
      action = <div key={i} className="action a-right">Left</div>
    } else if(move.movement.dir === "left") {
      action = <div key={i} className="action a-left">Right</div>
    }
  } else if(move.pickup) {
    action = <div key={i} className="action a-function">Pickup</div>
  } else if(move.loop) {
    action =
      (<div key={i} className="action a-loop">
        Loop
        {move.loop.cmds.map((move, i) => <DisplaySequence move={move.moves} />)}
      </div>)
  }
  let droppable = move.loop || move.pickup
  return (
    <div style={{width: "200px"}}>
    {droppable ?
      <Droppable droppableId="loop" type="action">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            // style={{ backgroundColor: snapshot.isDraggingOver ? 'grey' : 'lightgrey' }}
            >
            <Draggable draggableId={`${type}-${i}`} index={i}>
              {(provided, snapshot) => (
                <div>
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                  {action}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Draggable>
          </div>
        )}
      </Droppable> :
      <Draggable draggableId={`${type}-${i}`} index={i}>
        {(provided, snapshot) => (
          <div>
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
            {action}
            </div>
            {provided.placeholder}
          </div>
        )}
      </Draggable>}
    </div>
  );
}

export default DisplaySequence