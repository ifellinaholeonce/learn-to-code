import React, {Component} from 'react';
import { Route, Switch, Link } from 'react-router-dom';

let moveGroup = [
  {type: "forward"},
  {type: "forward"},
  {type: "loop", moves:[
    {type: "forward"},
    {type: "forward"},
  ]},
  {type: "left"},
  {type: "forward"},
  {type: "forward"},
]

function MoveSummary({ moves }) {
  return (
    <table className="student-table">
      <thead className="header">
        <tr>
          <th width="40%">Date</th>
          <th width="40%">Moves</th>
          <th width="20%">Success</th>
        </tr>
      </thead>
      <tbody>
      {moves.map((move, i) => (
        <tr>
          <td>{new Date(move.created_at).toString().replace(/(\d+:.+)$/, "")}</td>
          <td>{displaySequence(moveGroup)}</td>
          <td className="center" align="center">{move.completed && <i className="checkbox fas fa-check"></i>}</td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}

export default MoveSummary

function displaySequence(moves) {
  let actions = moves.map((move) => {
    if(move.type === "forward") {
      return <div className="action a-forward"><i className="symbol fas fa-arrow-right"></i></div>
    } else if(move.type === "right") {
      return <div className="action a-right"><i className="symbol fas fa-redo-alt"></i></div>
    } else if(move.type === "left") {
      return <div className="action a-left"><i className="symbol fas fa-undo-alt"></i></div>
    } else if(move.type === "pickup") {
      return <div className="action a-function"><i className="symbol far fa-hand-rock"></i></div>
    } else if(move.type === "loop") {
      return <div className="action a-loop"><i className="symbol fas fa-sync-alt"></i>{displaySequence(move.moves)}</div>
    }
  })
  return (
    <div className="action-groups">
      {actions}
    </div>
  );
}