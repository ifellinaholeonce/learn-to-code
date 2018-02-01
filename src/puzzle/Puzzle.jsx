import React, {Component} from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

import Navbar from './../Navbar.jsx';
import StudentView from './../StudentView.jsx';
import TeacherView from './../teacher/TeacherView.jsx';

class Puzzle extends Component {
  render() {
    return (
      <div className="puzzle">
        <div className="puzzle-container d-flex flex-column">
          <Question viewSummary={this.props.viewSummary} />
          <div className="display-container hints-container d-flex flex-row">
            <Display puzzle={this.props.puzzles.find((puz) => this.props.viewPuzzle === puz.id)}/>
            <HintList hints={this.props.hints} numHints={this.props.numHints} handleHintClick={this.props.handleHintClick}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Puzzle;
