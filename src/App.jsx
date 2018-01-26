import React, {Component} from 'react';
import Hint from './Hint.jsx'
import Puzzle from './Puzzle.jsx'

class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello React :)</h1>
        <Puzzle/>
        <Hint/>
      </div>
    );
  }
}
export default App;
