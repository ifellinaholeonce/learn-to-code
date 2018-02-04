import React, {Component} from 'react';
import { Route, Switch, Link } from 'react-router-dom';

class PuzzleList extends Component {
  showMove = puzzleId => e => {

  }
  render() {
    let puzzleItems;
    if(this.props.puzzles) {
      puzzleItems = this.props.puzzles.map((puzzle) => {
        let done = this.props.moves.find((move) => move.puzzle_id == puzzle.id && move.completed)
        return <PuzzleItem
          key={puzzle.id}
          puzzle={puzzle}
          done={done && done.completed} />
      })
    }
    return (
      <div className="student-summary container">
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

function PuzzleItem({puzzle, done}) {
  let { id, name, concept, completed } = puzzle;
  return(
    <tr className="puzzle-item">
      <td>{id}</td>
      <td><Link to={`/student/puzzles/${id}`}><i className="shadow play fas fa-arrow-circle-right"></i></Link></td>
      <td onClick={this.showMoves(id)} ><i className="shadow fas fa-caret-right"></i></td>
      <td className="left">{name}</td>
      <td className="left">{concept}</td>
      <td><div className="checkbox">{done && <i className="fas fa-check"></i>}</div></td>
    </tr>
  );
}

export default PuzzleList