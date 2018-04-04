import React, {Component} from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import MoveSummary from './MoveSummary.jsx';

class PuzzleList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewMoves: null
    }
  }
  render() {
    let unlocked = this.props.moves.reduce((acc, move) => Math.max(acc, move.completed ? move.puzzle_id + 1 : move.puzzle_id), 0);
    let puzzleItems = this.props.puzzles.map((puzzle) => {
      let done = this.props.moves.find((move) => move.puzzle_id == puzzle.id && move.completed);
      return <PuzzleItem
        key={puzzle.id}
        puzzle={puzzle}
        done={done && done.completed}
        unlocked={puzzle.id <= unlocked} />
    })

    let moves = this.props.moves.filter((move) => move.puzzle_id == this.state.viewPuzzle);
    return (
      <div className="student-summary">
        {this.state.viewPuzzle && <button onClick={this.toggleMoves} className="button">Back</button>}
        <table className="student-table">
          <thead className="header">
            <tr>
              <th width="5%"></th>
              <th width="15%">Play</th>
              <th width="15%">More</th>
              <th className="left" width="25%">Puzzle</th>
              <th className="left" width="25%">Learning Goal</th>
              <th width="15%">Done</th>
            </tr>
          </thead>
          <tbody>
            {puzzleItems}
          </tbody>
        </table>
      </div>
    );
  }
}

function PuzzleItem({puzzle, done, unlocked}) {
  let { id, name, concept, completed } = puzzle;
  return(
    <tr className={`puzzle-item ${!unlocked && "locked"}`}>
      <td>{id}</td>
      <td>{unlocked && <Link to={`/student/puzzles/${id}`}><i className="shadow play fas fa-arrow-circle-right"></i></Link>}</td>
      <td>{unlocked && <Link to={`/student/moves/${puzzle.id}`}><i className="shadow fas fa-caret-right"></i></Link>}</td>
      <td className="left">{name}</td>
      <td className="left">{concept}</td>
      <td><i className={`checkbox ${done && "completed"} fas fa-check`}></i></td>
    </tr>
  );
}

export default PuzzleList
