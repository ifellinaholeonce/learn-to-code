import React, {Component} from 'react';
import Puzzle from './Puzzle.jsx'
import HintList from './HintList.jsx'
import Question from './Question.jsx'
import Answer from './Answer.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hints: ['hint1','hint2','hint3'],
      numHints: 0
    }
  }

  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <h1>Student View Puzzle</h1>
        <Puzzle/>
        <HintList hints={this.state.hints} numHints={this.state.numHints}/>
        <Question/>
        <Answer/>
      </div>
    );
  }
}
export default App;


