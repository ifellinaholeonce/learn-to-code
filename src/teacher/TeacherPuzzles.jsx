import React, {Component} from 'react';
import { Route, Switch, Link } from 'react-router-dom';

function TeacherPuzzles({moves, puzzles, studentId}) {
  let puzzleItems = groupPuzzleData(puzzles, moves, studentId)
  return (
    <div className="student-history">
      <Link to="/teacher/students"><button className="button navigation">Back</button></Link>
      <table className="student-table teacher-table">
        <thead className="header">
          <tr>
            <th width="10%"></th>
            <th width="15%">More</th>
            <th className="left" width="25%">Puzzle</th>
            <th className="left" width="25%">Learning Goal</th>
            <th width="10%">Attempts</th>
            <th width="15%">Done</th>
          </tr>
        </thead>
        <tbody>
          {puzzleItems}
        </tbody>
      </table>
    </div>)
}

// Each row is a puzzle and the student's performance for that puzzle
function PuzzleItem({puzzle, done, attempts, studentId}) {
  let { id, name, concept } = puzzle
  console.log("Puzzle:", puzzle)
  return (
    <tr scope="row">
      <td><Link to={`${studentId}/puzzle/${id}`}>{id}</Link></td>
      <td><i className="shadow fas fa-caret-right"></i></td>
      <td className="left">{name}</td>
      <td className="left">{concept}</td>
      <td>{attempts}</td>
      <td>{done && <i className="checkbox fas fa-check"></i>}</td>
    </tr>
  )
}

function groupPuzzleData(puzzles, moves, studentId) {
  let puzzleItems = puzzles.map((puzzle) => {
    let done = moves.find((move) => move.puzzle_id == puzzle.id && move.completed)
    let attempts = moves.filter((move) => move.puzzle_id == puzzle.id).length
    return <PuzzleItem
      key={puzzle.id}
      studentId={studentId}
      puzzle={puzzle}
      attempts={attempts}
      done={done && done.completed} />
  })
  return puzzleItems;
}

export default TeacherPuzzles