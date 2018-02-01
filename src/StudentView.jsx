import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import HintList from './puzzle/HintList.jsx';
import Question from './Question.jsx';
import Answer from './Answer.jsx';
import Display from './puzzle/Display.jsx';
import PuzzleList from './PuzzleList.jsx';

import request from '../models/resource.js'


class StudentView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentPuzzles: [],
      puzzles: [],
      hints: ['hint1','hint2','hint3'],
      numHints: 0,
      viewPuzzle: null
    };
  }
  componentDidMount() {
    if(this.props.id) {
      request(`students/${this.props.id}/moves`, "GET", this.props.auth )
        .then((data) => this.setState({ studentPuzzles: data })
      )
      request(`puzzles`, "GET", this.props.auth)
        .then((data) => {
          this.setState({ puzzles: data })
      })
    }
  }
  handleHintClick = () => {
    let newHints = this.state.numHints + 1;
    this.setState({numHints: newHints})
  }
  clickPuzzle = id => e => {
    this.setState({ viewPuzzle: id })
  }
  render() {
    return (
      <div className="student-view">
        {!this.state.viewPuzzle ? <PuzzleList click={this.clickPuzzle} puzzles={this.state.puzzles}/> :
        (<div className="d-flex flex-column puzzle-container">
          <Question/>
          <div className="d-flex flex-row">
            <Display/>
            <HintList hints={this.state.hints} numHints={this.state.numHints} handleHintClick={this.handleHintClick}/>
          </div>
        </div>)}
      </div>
    );
  }
}

export default StudentView

