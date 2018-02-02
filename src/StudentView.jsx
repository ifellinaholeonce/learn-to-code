import React, {Component} from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import HintList from './puzzle/HintList.jsx';
import Question from './Question.jsx';
import Answer from './Answer.jsx';
import Display from './puzzle/Display.jsx';
import PuzzleList from './PuzzleList.jsx';
import Puzzle from './puzzle/Puzzle.jsx';

import request from '../models/resource.js'

class StudentView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moves: [],
      puzzles: [],
      hints: ['hint1','hint2','hint3'],
      numHints: 0,
    };
  }
  componentDidMount() {
    if(this.props.userId) {
      request(`students/${this.props.userId}/moves`, "GET", this.props.auth)
        .then((data) => this.setState({ moves: data })
      )
      request("puzzles", "GET", this.props.auth)
        .then((data) => {
          console.log("Puzzles response:",data)
          this.setState({ puzzles: data })
      })
    }
  }
  handleHintClick = () => {
    let newHints = this.state.numHints + 1;
    this.setState({numHints: newHints})
  }
  saveMove = (moves, done) => {
    Request(`students/${viewPuzzle}/moves`, "POST", this.props.auth)
  }
  render() {
    return (
      <div className="student-view">
        <Switch>
          <Route path="/student/puzzles" exact render={(props) => <PuzzleList {...props} puzzles={this.state.puzzles} />} />
          <Route path="/student/puzzles/:id" render={(props) => <Puzzle {...props}
            puzzles={this.state.puzzles}
            moves={this.state.moves}
            hints={this.state.hints}
            numHints={this.state.numHints}
            handleHintClick={this.handleHintClick}
          />} />
        </Switch>
      </div>
    );
  }
}

export default StudentView

