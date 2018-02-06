import React, {Component} from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import DisplaySequence from '../puzzle/DisplaySequence.jsx';

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