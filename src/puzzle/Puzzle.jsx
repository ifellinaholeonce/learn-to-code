import React, {Component} from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import Navbar from './../Navbar.jsx';
import Question from '../Question.jsx';
import Display from '../puzzle/Display.jsx';
import HintList from './HintList.jsx';

import request from '../../models/resource.js'

class Puzzle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numHints: 0
    }
  }
  componentDidMount() {
  }
  handleHintClick = () => {
    console.log("Hints", this.state.numHints)
    this.setState({numHints: this.state.numHints + 1})
  }
  render() {
    let move = this.props.moves.find((move) => this.props.match.params.puzzleId == move.id )
    let puzzle = this.props.puzzles.find((puz) => puz.id == move.puzzle_id )
    return (
      <div className="puzzle">
        <div className="puzzle-container d-flex flex-column">
          <Link to="/student/puzzles"><button className="btn btn-success">Back</button></Link>
          <Question/>
          <div className="display-container hints-container d-flex flex-row">
            <Display puzzle={puzzle}/>
            <HintList hints={puzzle.game.hints} numHints={this.state.numHints} handleHintClick={this.handleHintClick}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Puzzle;
