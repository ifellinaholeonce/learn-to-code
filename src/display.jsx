import React, {Component} from 'react';
import Square from './Squares.jsx';

let board = [
  {type: "trees"},
  {type: "trees"},
  {type: "camp"},
  {type: "trees"},
  {type: "trees"},
  {type: "path"},
  {type: "path"},
  {type: "path"},
  {type: "path"},
  ];

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = { display: board };
  }
  render() {
    let squares = this.state.display.map(elm =>
      <Square type={elm.type}/>
    );
    return (
      <div className="Board">
        {squares}
      </div>
    );
  }
}

export default Display;