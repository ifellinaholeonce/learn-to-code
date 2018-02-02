import React, {Component} from 'react';
import { Route, Switch, Link } from 'react-router-dom';

class PuzzleList extends Component {
  render() {
    let puzzleItems;
    if(this.props.puzzles) {
      puzzleItems = this.props.puzzles.map((puzzle) => {
        return <PuzzleItem
          id={puzzle.id}
          name={puzzle.name}
          concept={puzzle.concept}
          completed={puzzle.completed} />
      })
    }
    return (
      <div className="student-summary">
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Concept</th>
              <th>Done</th>
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

function PuzzleItem({id, name, concept, completed, click}) {
  return(
    <tr className="puzzle-item">
      <td>{id}</td>
      <td><Link to={`/student/puzzles/${id}`}>{name}</Link></td>
      <td>{concept}</td>
      <td>{completed}</td>
    </tr>
  );
}

export default PuzzleList