import React, {Component} from 'react';
import Square from './Squares.jsx';
import Answer from './../Answer.jsx';


let board = [
  {type: "trees"}, {type: "trees"}, {type: "camp"}, {type: "trees"}, {type: "trees"},
  {type: "trees"}, {type: "trees"}, {type: "path"}, {type: "trees"}, {type: "trees"},
  {type: "path" }, {type: "path" }, {type: "path"}, {type: "trees"}, {type: "trees"},
  {type: "trees"}, {type: "trees"}, {type: "path"}, {type: "trees"}, {type: "trees"},
  {type: "trees"}, {type: "trees"}, {type: "path"}, {type: "trees"}, {type: "trees"},
];

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: board,
      playerLoc: {x: 0, y: 2},
      startLoc: {x: 0, y: 2},
      playerDir: 3, // 1 = North, 2 = East, 3 = South, 4 = West
      pendingCommands: []
     };
  }

  componentDidUpdate = () => {

  }

  runCommands = () => {
    let execute = ( pendingCommands ) => {
      let command = pendingCommands.shift()
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
        if (pendingCommands.length > 0) {
          execute(pendingCommands)
        }
      }.bind(this), 1000); //Need a timeout so React doesn't compile all of the movements into one update.
    }
    execute(this.state.pendingCommands)
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

  //Expects an array of commands from Answers - forward, left, right
  prepCommands = (commands) => {
    this.setState({
      pendingCommands: commands
    })
  }

  checkSquare = (type) => {
    //if the square has the player and the type is not path, reset the player
    if ( type !== "path" ) {
      this.setState({
        playerLoc: this.state.startLoc
      })
    }
  }
  render() {
    let squares = this.state.display.map((elm, i) => {
      let length = Math.sqrt(this.state.display.length);
      let xPos = i % length + 1;
      let yPos = Math.floor(i / length) + 1;
      if (xPos === this.state.playerLoc.x && yPos === this.state.playerLoc.y) {
        this.checkSquare(elm.type);
      }
      return <Square key={`${xPos} ${yPos}`} type={elm.type} x={xPos} y={yPos} dir={this.state.playerDir}/>
    });

    let playerLocStyle = {
      top: (this.state.playerLoc.y * 20) + "%",
      left: (this.state.playerLoc.x * 20) + "%",
    }

    return (
      <div className="puzzle">
        <div className="d-flex flex-column">
          <div className="board">
            <div className="overlay">
              {squares}
            </div>
            <div className="player" style={playerLocStyle}>
                <div className="player-top"></div>
                  {/* {( dir === "east" || dir === "south" ) &&
                    <div className="player-eye-right"></div>
                  }
                  {( dir === "west" || dir === "south" ) &&
                    <div className="player-eye-left"></div>
                  } */}
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
