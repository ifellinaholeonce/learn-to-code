import React, {Component} from 'react';
import Hint from './Hint.jsx';
import Puzzle from './Puzzle.jsx';
import Display from './display.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello React :)</h1>
        <Puzzle/>
        <Hint/>
        <Display/>
      </div>
    );
  }
}
export default App;
