import React, {Component} from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import MoveSummary from './MoveSummary.jsx';

class PuzzleList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewPuzzle: null
    }
  }
  showMoves = puzzleId => e => {
    if(this.state.viewPuzzle === puzzleId) {
      this.setState({ viewPuzzle: null })
    } else {
      this.setState({ viewPuzzle: puzzleId })
    }
  }
  render() {
    let puzzleItems;
    if(this.props.puzzles) {
      puzzleItems = this.props.puzzles.map((puzzle) => {
        let done = this.props.moves.find((move) => move.puzzle_id == puzzle.id && move.completed)
        return <PuzzleItem
          showMoves={this.showMoves}
          key={puzzle.id}
          puzzle={puzzle}
          done={done && done.completed} />
      })
    }
    let moves = this.props.moves.filter((move) => move.puzzle_id == this.state.viewPuzzle)
    return (
      <div className="student-summary container">
        {this.state.viewPuzzle && <MoveSummary moves={moves} />}
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

function PuzzleItem({puzzle, done, showMoves}) {
  let { id, name, concept, completed } = puzzle;
  return(
    <tr className="puzzle-item">
      <td>{id}</td>
      <td><Link to={`/student/puzzles/${id}`}><i className="shadow play fas fa-arrow-circle-right"></i></Link></td>
      <td onClick={showMoves(id)} ><i className="shadow fas fa-caret-right"></i></td>
      <td className="left">{name}</td>
      <td className="left">{concept}</td>
      <td align="center">{done && <i className="checkbox fas fa-check"></i>}</td>
    </tr>
  );
}

export default PuzzleList