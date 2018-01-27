import React, {Component} from 'react';
import HintList from './HintList.jsx';
import Question from './Question.jsx';
import Answer from './Answer.jsx';
import Display from './display.jsx';
import Navbar from './Navbar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hints: ['hint1','hint2','hint3'],
      numHints: 0
    };
  }
  componentDidMount() {
    // Fetch calls for Puzzle
  }
  render() {
    console.log("Rendering <App/>");
    return (
      <div className="body">
        <Navbar/>
        <Display/>
        <HintList hints={this.state.hints} numHints={this.state.numHints} handleHintClick={this.handleHintClick}/>
        <Question/>
        <Display/>
        <Answer/>
      </div>
    );
  }

  handleHintClick = () => {
    let newHints = this.state.numHints + 1;
    this.setState({numHints: newHints})
  }

}
export default App;
