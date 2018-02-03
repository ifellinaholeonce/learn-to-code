import React, {Component} from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import Puzzle from '../puzzle/Puzzle.jsx';

import request from '../../models/resource.js'

// Component for displaying each individual students performance
class StudentInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moves: [],
      puzzles: []
    };
  }
  componentDidMount() {
    request(`students/${this.props.match.params.id}/moves`, "GET", this.props.auth)
      .then((data) => {
        let { moves, puzzles } = data
        this.setState({ moves, puzzles });
      });
  }
  render() {
    return (
      <div className="student-info">
      <Switch>
        <Route
          path="/teacher/students/:id" exact
          render={(props) => <TeacherPuzzles {...props}
            moves={this.state.moves}
            studentId={this.props.match.params.id} />} />
        <Route path="/teacher/students/:studentId/puzzle/:puzzleId"
          render={(props) => <Puzzle {...props}
          user="Teacher"
          puzzles={this.state.puzzles}
          moves={this.state.moves}
          hints={this.state.hints}
          numHints={this.state.numHints}
          handleHintClick={this.handleHintClick} />} />
        </Switch>
      </div>
    );
  }
}

// Each row is a puzzle and the student's performance for that puzzle
function PuzzleItem({puzzle, studentId}) {
  let { id, complete, attempts, concept } = puzzle
  return (
    <tr scope="row">
      <td><Link to={`${studentId}/puzzle/${id}`}>{id}</Link></td>
      <td>{complete}</td>
      <td>{attempts}</td>
      <td>{concept}</td>
    </tr>
  )
}

function TeacherPuzzles({moves, studentId}) {
  let puzzles = moves.map((puzzle) =>
    <PuzzleItem
      studentId={studentId}
      key={puzzle.id}
      puzzle={puzzle} />
  );
  return (
    <div className="student-history">
      <Link to="/teacher/students"><button className="btn btn-success">Back</button></Link>
      <table className="student table">
        <thead className="thead-light">
          <tr>
            <th>#</th>
            <th>Progress</th>
            <th>Attempts</th>
            <th>Concept</th>
          </tr>
        </thead>
        <tbody>
          {puzzles}
        </tbody>
      </table>
    </div>)
}

function groupPuzzleData(puzzles) {
  gouped = {};
  puzzles.forEach((puzzle) => {
    if(!summary[puzzle.id]) {
      summary[puzzle.id] = [];
    }
    summary[puzzle.id].push(puzzle)
  })

  summary = []
  for(let key of summary) {
    let attempts = summary[key].length
    let completed = summary[key].find((puzzle) => puzzle.completed === true).completed
    let result = {id: key, completed: true}
  }
}

export default StudentInfo;