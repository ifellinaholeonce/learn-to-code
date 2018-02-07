import React, {Component} from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Navbar from '../Navbar.jsx';
import Question from './Question.jsx';
import Display from './Display.jsx';
import HintList from './HintList.jsx';
import IsometricBoard from './IsometricBoard.jsx'

import request from '../../models/resource.js'

class Puzzle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numHints: 0
    }
  }
  handleHintClick = () => {
    let newHints = this.state.numHints + 1;
    this.setState({numHints: newHints})
  }
  render() {
    let moves = this.props.moves
    let puzzle = this.props.puzzle
    let location = this.props.location.state
    return (
      <div className="puzzle">
          <Question question={puzzle.game.question} />
          <HintList
            hints={puzzle.game.hints}
            numHints={this.state.numHints}
            handleHintClick={this.handleHintClick} />
          <Display props={this.props} puzzle={puzzle} moves={moves} moveId={location && location.moveId} />
      </div>
    );
  }
}

export default Puzzle;
