import React, {Component} from 'react';
import Dragula from 'react-dragula';

function TeacherStudentMoves({ moves, match, viewMove }) {
  return (
    <table className="student-table teacher-moves">
      <thead>
        <tr>
          <th>Date</th>
          <th>Done</th>
        </tr>
      </thead>
      <tbody>
        {moves.filter(move => move.puzzle_id == match.params.puzzleId).map(move =>
          <tr onClick={viewMove(move.id)}>
            <td>{move.created_at}</td>
            <td><i className={`checkbox ${move.completed && "completed"} fas fa-check`}></i></td>
          </tr>
        )}
      </tbody>
    </table>)
}

export default TeacherStudentMoves