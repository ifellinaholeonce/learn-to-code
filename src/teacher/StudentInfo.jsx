import React, {Component} from 'react';

// Component for displaying each individual students performance
class StudentInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentInfo: []
    };
  }
  componentDidMount() {
    fetch(`http://localhost:3000/students/${this.props.id}/moves`)
      .then((data) => {
        console.log("Puzzle data:", data)
        this.setState({studentInfo: data});
      });
  }
  render() {
    let puzzles = this.state.studentInfo.map((puzzle) =>
      <PuzzleItem
        key={puzzle.id}
        id={puzzle.id}
        completed={puzzle.complete}
        attempts={puzzle.attempts}
        concept={puzzle.concept}/>
    );
    return (
      <div className="student-info">
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
      </div>
    );
  }
}

// Each row is a puzzle and the student's performance for that puzzle
function PuzzleItem({id, complete, attempts, concept}) {
  return (
    <tr scope="row">
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