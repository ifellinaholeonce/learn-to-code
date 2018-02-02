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

    }
  }
  componentDidMount() {
  }
  render() {
    return (
      <div className="puzzle">
        <div className="puzzle-container d-flex flex-column">
          <Link to="/student/puzzles"><button className="btn btn-success">Back</button></Link>
          <Question/>
          <div className="display-container hints-container d-flex flex-row">
            <Display puzzle={this.props.puzzles.find((puz) => this.props.match.params.id == puz.id )}/>
            <HintList hints={this.props.hints} numHints={this.props.numHints} handleHintClick={this.props.handleHintClick}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Puzzle;
