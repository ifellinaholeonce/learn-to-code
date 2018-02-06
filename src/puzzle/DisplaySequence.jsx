import React, {Component} from 'react';

function DisplaySequence({ moveGroup }) {
  let actions = moveGroup.map((move, i) => {
    if(move.type === "forward") {
      return <div key={i} className="action a-forward"><i className="symbol fas fa-arrow-right"></i></div>
    } else if(move.type === "right") {
      return <div key={i} className="action a-right"><i className="symbol fas fa-redo-alt"></i></div>
    } else if(move.type === "left") {
      return <div key={i} className="action a-left"><i className="symbol fas fa-undo-alt"></i></div>
    } else if(move.type === "pickup") {
      return <div key={i} className="action a-function"><i className="symbol far fa-hand-rock"></i></div>
    } else if(move.type === "loop") {
      return <div key={i} className="action a-loop"><i className="symbol fas fa-sync-alt"></i><DisplaySequence moveGroup={move.moves} /></div>
    }
  })
  return (
    <div className="action-groups">
      {actions}
    </div>
  );
}

export default DisplaySequence