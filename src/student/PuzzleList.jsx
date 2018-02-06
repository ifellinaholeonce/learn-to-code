import React, {Component} from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import MoveSummary from './MoveSummary.jsx';

class PuzzleList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewPuzzle: null,
      viewMoves: null
    }
  }
  showMoves = puzzleId => e => {
    if(this.state.viewPuzzle === puzzleId) {
      this.setState({ viewPuzzle: null })
    } else {
      this.setState({ viewPuzzle: puzzleId })
    }
  }
  toggleMoves = moveId => e => {
    let move = this.state.viewMoves === moveId ? null : moveId
    this.setState({viewMoves: move})
  }
  render() {
    let unlocked = this.props.moves.reduce((acc, move) => Math.max(acc, move.puzzle_id), 0) + 1;
    let puzzleItems = this.props.puzzles.map((puzzle) => {
      let done = this.props.moves.find((move) => move.puzzle_id == puzzle.id && move.completed);
      return <PuzzleItem
        showMoves={this.showMoves}
        key={puzzle.id}
        puzzle={puzzle}
        done={done && done.completed}
        unlocked={puzzle.id <= unlocked} />
    })
    let moves = this.props.moves.filter((move) => move.puzzle_id == this.state.viewPuzzle);
    return (
      <div className="student-summary">
        {this.state.viewPuzzle ? <MoveSummary toggleMoves={this.toggleMoves} viewMoves={this.state.viewMoves} moves={moves} /> :
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
        }
      </div>
    );
  }
}

function PuzzleItem({puzzle, done, showMoves, unlocked}) {
  let { id, name, concept, completed } = puzzle;
  return(
    <tr className={`puzzle-item ${unlocked && "locked"}`}>
      <td>{id}</td>
      <td><Link to={`/student/puzzles/${id}`}><i className="shadow play fas fa-arrow-circle-right"></i></Link></td>
      <td onClick={unlocked && showMoves(id)} ><i className="shadow fas fa-caret-right"></i></td>
      <td className="left">{name}</td>
      <td className="left">{concept}</td>
      <td align="center">{done && <i className="checkbox fas fa-check"></i>}</td>
    </tr>
  );
}

export default PuzzleList