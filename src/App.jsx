import React, {Component} from 'react';
import Hint from './Hint.jsx'
import Puzzle from './Puzzle.jsx'
import Question from './Question.jsx'
import Answer from './Answer.jsx'

class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello React :)</h1>
        <Puzzle/>
        <Hint/>
        <Question/>
        <Answer/>
      </div>
    );
  }
}
export default App;


