import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import HintList from './puzzle/HintList.jsx';
import Question from './Question.jsx';
import Answer from './Answer.jsx';
import Display from './puzzle/Display.jsx';

class StudentView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hints: ['hint1','hint2','hint3'],
      numHints: 0
    };
  }
  handleHintClick = () => {
    let newHints = this.state.numHints + 1;
    this.setState({numHints: newHints})
  }
  render() {
    return (
      <div className="student-view">
        <div className="d-flex flex-column puzzle-container">
          <Question/>
          <div className="d-flex flex-row">
            <Display/>
            <HintList hints={this.state.hints} numHints={this.state.numHints} handleHintClick={this.handleHintClick}/>
          </div>
        </div>
        <footer>
          This is the footer.
          &copy; Code Trail Educational Foundation.
        </footer>
      </div>
    );
  }
}

export default StudentView

