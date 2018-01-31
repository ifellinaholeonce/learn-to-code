import React, {Component} from 'react';
import Square from './Squares.jsx';
import Answer from './../Answer.jsx';


let board = [
  {x: 0, y: 0, type: "trees"}, {x: 1, y: 0, type: "trees"}, {x: 2, y: 0, type: "camp"}, {x: 3, y: 0, type: "trees"}, {x: 4, y: 0, type: "trees"},
  {x: 0, y: 1, type: "trees"}, {x: 1, y: 1, type: "trees"}, {x: 2, y: 1, type: "path"}, {x: 3, y: 1, type: "trees"}, {x: 4, y: 1, type: "trees"},
  {x: 0, y: 2, type: "path" }, {x: 1, y: 2, type: "path" }, {x: 2, y: 2, type: "path"}, {x: 3, y: 2, type: "trees"}, {x: 4, y: 2, type: "trees"},
  {x: 0, y: 3, type: "trees"}, {x: 1, y: 3, type: "trees"}, {x: 2, y: 3, type: "path"}, {x: 3, y: 3, type: "trees"}, {x: 4, y: 3, type: "trees"},
  {x: 0, y: 4, type: "trees"}, {x: 1, y: 4, type: "trees"}, {x: 2, y: 4, type: "path"}, {x: 3, y: 4, type: "trees"}, {x: 4, y: 4, type: "trees"},
];

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: board,
      playerLoc: {x: 0, y: 2},
      startLoc: {x: 0, y: 2},
      playerDir: 3, // 1 = North, 2 = East, 3 = South, 4 = West
      startDir: 3,
      pendingCommands: []
     };
  }

  //Expects an array of commands from Answers - forward, left, right
  prepCommands = (commands) => {
    this.setState({
      pendingCommands: commands
    })
  }

  runCommands = () => {
    let execute = ( pendingCommands ) => {
      let command = pendingCommands.shift();
      let playerDir = this.state.playerDir;
      switch (command) {
        case 'forward':
          switch (this.state.playerDir) {
            case 1:
              this.moveNorth();
              break;
            case 2:
              this.moveEast();
              break;
            case 3:
              this.moveSouth();
              break;
            case 4:
              this.moveWest();
              break;
            default:
          }
          break;
        case 'left':
          if (playerDir === 1) {
            playerDir = 4
          } else {
            playerDir--;
          }
          this.setState({
            playerDir
          })
          break;
        case 'right':
          if (playerDir === 4) {
            playerDir = 1
          } else {
            playerDir++;
          }
          this.setState({
            playerDir
          })
        default:
      }
      setTimeout(function() {

        if ( !this.checkIsPath() ) {
          this.resetMap();
        }
        if (pendingCommands.length > 0) {
          execute(pendingCommands)
        }
      }.bind(this), 1000); //Need a timeout so React doesn't compile all of the movements into one update.
    }
    let stateCommands = this.state.pendingCommands.slice(0)
    execute(stateCommands)
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

  checkIsPath = () => {
    //if the square has the player and the type is not path, return false
    let path = true;
    let grid = this.initMap()
    grid.forEach((square) => {
      if ( square.props.x === this.state.playerLoc.x && square.props.y === this.state.playerLoc.y && square.props.type !== "path" ) {
        path = false;
      }
    })
    return path;
  }

  resetMap = () => {
    this.setState({
      playerDir: this.state.startDir,
      playerLoc: this.state.startLoc
    })
  }

  initMap = () => {
    let grid = this.state.display.map((square, i) => {
      return <Square key={`${square.x} ${square.y}`} type={square.type} x={square.x} y={square.y} />
    });
    return grid;
  }

  render() {
    console.log("rerender")


    let playerLocStyle = {
      top: (this.state.playerLoc.y * 20) + "%",
      left: (this.state.playerLoc.x * 20) + "%",
    }

    return (
      <div className="puzzle">
        <div className="d-flex flex-column">
          <div className="board">
            <div className="overlay">
              {this.initMap()}
            </div>
            <div className="player" style={playerLocStyle}>
              <div className="player-top"></div>
              <div className="player-eye-right"></div>
              <div className="player-eye-left"></div>
              <div className="player-bottom"></div>
              <div className="player-feet"></div>
            </div>
          </div>
          <Answer prepCommands={this.prepCommands} runCommands={this.runCommands}/>
        </div>
      </div>
    );
  }
}

export default Display;