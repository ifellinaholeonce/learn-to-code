import React, {Component} from 'react';
import Square from './Squares.jsx';

let board = [
  {type: "trees"}, {type: "trees"}, {type: "camp"},
  {type: "trees"}, {type: "trees"}, {type: "path"},
  {type: "path"}, {type: "path"}, {type: "path"}
];

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = { display: board };
  }
  render() {
    let squares = this.state.display.map((elm, i) => {
      let length = Math.sqrt(this.state.display.length);
      let xPos = i % length + 1;
      let yPos = Math.floor(i / length) + 1;
      return <Square type={elm.type} x={xPos} y={yPos}/>
    }
    );
    return (
      <div className="board">
        {squares}
      </div>
    );
  }
}

export default Display;