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

function MoveSummary({ moves, viewMoves, toggleMoves }) {
  return (
    <table className="student-table">
      <thead className="header">
        <tr>
          <th width="30%">Date</th>
          <th width="20%">Edit</th>
          <th width="30%">Moves</th>
          <th width="20%">Success</th>
        </tr>
      </thead>
      <tbody>
      {moves.map((move, i) => (
        <tr key={move.id}>
          <td>{new Date(move.created_at).toString().replace(/(\d+:.+)$/, "")}</td>
          <td>
            <Link to={{
              pathname: `/student/puzzles/${move.puzzle_id}`,
              state: { moveId: move.id }}}>
              <i className="shadow fas fa-pencil-alt"></i>
            </Link>
          </td>
          <td onClick={toggleMoves(move.id)}>
            {viewMoves !== move.id ? "Show" : <DisplaySequence moveGroup={moveGroup} />}
          </td>
          <td><i className={`checkbox ${move.completed && "completed"} fas fa-check`}></i></td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}

export default MoveSummary

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