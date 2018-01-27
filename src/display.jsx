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
    this.state = {
      display: board,
      playerLoc: {x: 1, y: 3}
     };
  }

  moveNorth = () => {
    let newLoc = {x: this.state.playerLoc.x, y: this.state.playerLoc.y - 1}
    this.setState({
      playerLoc: newLoc
    })
  }

  moveEast = () => {
    let newLoc = {x: this.state.playerLoc.x + 1, y: this.state.playerLoc.y}
    this.setState({
      playerLoc: newLoc
    })
  }

  moveSouth = () => {
    let newLoc = {x: this.state.playerLoc.x, y: this.state.playerLoc.y + 1}
    this.setState({
      playerLoc: newLoc
    })
  }

  moveWest = () => {
    let newLoc = {x: this.state.playerLoc.x - 1, y: this.state.playerLoc.y}
    this.setState({
      playerLoc: newLoc
    })
  }

  render() {
    let squares = this.state.display.map((elm, i) => {
      let length = Math.sqrt(this.state.display.length);
      let xPos = i % length + 1;
      let yPos = Math.floor(i / length) + 1;
      let hasPlayer = false;
      if (xPos === this.state.playerLoc.x && yPos === this.state.playerLoc.y) {
        hasPlayer = true;
      }
      return <Square type={elm.type} x={xPos} y={yPos} player={hasPlayer}/>
    }
    );
    return (
      <div className="board">
        {squares}
        <button onClick={this.moveEast}>-></button>
        <button onClick={this.moveNorth}>^</button>
      </div>
    );
  }
}

export default Display;
