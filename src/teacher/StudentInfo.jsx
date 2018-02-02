import React, {Component} from 'react';

import Puzzle from '../puzzle/Puzzle.jsx';

import request from '../../models/resource.js'

// Component for displaying each individual students performance
class StudentInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentInfo: []
    };
  }
  componentDidMount() {
    request(`students/${this.props.id}/moves`, "GET", this.props.auth)
      .then((data) => {
        this.setState({studentInfo: data});
      });
  }
  render() {
    let puzzles = this.state.studentInfo.map((puzzle) =>
      <PuzzleItem
        key={puzzle.id}
        id={puzzle.id}
        click={this.props.viewPuzzle(puzzle.id)}
        completed={puzzle.complete}
        attempts={puzzle.attempts}
        concept={puzzle.concept}/>
    );
    return (
      <div className="student-info">
        {!this.props.puzzle ?
        (<div className="student-history">
          <button onClick={this.props.viewSummary} className="btn btn-success">Back</button>
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
        </div>) :
        <Puzzle
          user="Teacher"
          viewSummary={this.viewSummary}
          saveMove={this.saveMove}
          puzzle={this.state.puzzles.find((puz) => this.state.viewPuzzle === puz.id)}
          hints={this.state.hints}
          numHints={this.state.numHints}
          handleHintClick={this.handleHintClick} />}
      </div>
    );
  }
}

// Each row is a puzzle and the student's performance for that puzzle
function PuzzleItem({id, complete, attempts, concept, click}) {
  return (
    <tr onClick={click} scope="row">
      <td>{id}</td>
      <td>{complete}</td>
      <td>{attempts}</td>
      <td>{concept}</td>
    </tr>
  )
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