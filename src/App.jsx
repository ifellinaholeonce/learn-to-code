import React, {Component} from 'react';
import HintList from './HintList.jsx'
import Question from './Question.jsx'
import Answer from './Answer.jsx'
import Display from './display.jsx';
import StudentInput from './StudentInput.jsx';

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
        <Display/>
        <HintList hints={this.state.hints} numHints={this.state.numHints} handleHintClick={this.handleHintClick}/>
        <Question/>
        <Answer/>
        <StudentInput/>
      </div>
    );
  }

  handleHintClick = () => {
    let newHints = this.state.numHints + 1;
    this.setState({numHints: newHints})
  }

}
export default App;


