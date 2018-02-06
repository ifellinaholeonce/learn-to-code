import React, {Component} from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import PuzzleList from './PuzzleList.jsx';
import Puzzle from '../puzzle/Puzzle.jsx';
import IsometricBoard from './IsometricBoard.jsx';
import request from '../../models/resource.js'

class StudentView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moves: [],
      puzzles: [],
      puzzleId: null
    };
  }
  componentDidMount() {
    if(this.props.userId) {
      request(`students/${this.props.userId}/moves`, "GET", this.props.auth)
        .then((data) => {
          let { moves, puzzles } = data;
          this.setState({ moves, puzzles })
        }
      )
    }
  }
  saveMove = (moves, done) => {
    Request(`students/${viewPuzzle}/moves`, "POST", this.props.auth)
  }
  // <IsometricBoard />
  render() {
    let puzzleId = this.props.location.pathname.match(/\d+/)
    let puzzle = this.state.puzzles.find((puz) => puz.id == puzzleId)
    return (
      <div className="student-view">
        <Switch>
          <Route path="/student/puzzles" exact render={(props) =>
            <PuzzleList {...props}
              puzzles={this.state.puzzles}
              moves={this.state.moves} />} />
          <Route path="/student/puzzles/:puzzleId" render={(props) =>
            <Puzzle {...props}
              puzzle={puzzle}
              moves={this.state.moves} />} />
        </Switch>
      </div>
    );
  }
}

export default StudentView

