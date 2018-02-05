import React, {Component} from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Navbar from '../Navbar.jsx';
import Question from './Question.jsx';
import Display from './Display.jsx';
import HintList from './HintList.jsx';

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
    return (
      <div className="puzzle">
        <div className="puzzle-container d-flex flex-column">
          <Question/>
          <div className="display-container hints-container d-flex flex-row">
            <Display puzzle={puzzle}/>
            <HintList
              hints={puzzle.game.hints}
              numHints={this.state.numHints}
              handleHintClick={this.handleHintClick} />
          </div>
        </div>
      </div>
    );
  }
}

export default Puzzle;
