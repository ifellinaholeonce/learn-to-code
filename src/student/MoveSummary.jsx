import React, {Component} from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import DisplaySequence from '../puzzle/DisplaySequence.jsx';


function MoveSummary({ moves, viewMoves, toggleMoves, match }) {
  let puzzleMoves = moves.filter(move => move.puzzle_id == match.params.puzzleId)
  console.log("Moves:", moves)
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
      {puzzleMoves.map((move, i) => (
        <tr key={move.id}>
          <td>{new Date(move.created_at).toString().replace(/(\d+:.+)$/, "")}</td>
          <td>
            <Link to={{
              pathname: `/student/puzzles/${move.puzzle_id}`,
              state: { moveId: move.id }}}>
              <i className="shadow fas fa-pencil-alt"></i>
            </Link>
          </td>
          <td className="center" onClick={toggleMoves(move.id)}>
            {viewMoves !== move.id ? "Show" : move.moves.map((indMove, i) => <DisplaySequence key={i} i={i} move={indMove} />)}
          </td>
          <td><i className={`checkbox ${move.completed && "completed"} fas fa-check`}></i></td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}

export default MoveSummary