import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class PuzzleList extends Component {
  render() {
    let puzzleItems = this.props.puzzles.map((puzzle) => {
      console.log(puzzle)
      return <PuzzleItem
        id={puzzle.id}
        name={puzzle.name}
        concept={puzzle.concept}
        completed={puzzle.completed}
        click={this.props.click(puzzle.id)}
      />
    })
    return (
      <div className="student-summary">
        <table>
          <thead>
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
    <tr onClick={click} className="puzzle-item">
      <td>{id}</td>
      <td>{name}</td>
      <td>{concept}</td>
      <td>{completed}</td>
    </tr>
  );
}

export default PuzzleList