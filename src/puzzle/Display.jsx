import React, {Component} from 'react';
import Square from './Squares.jsx';
import Answer from './Answer.jsx';
import Sam from './Sam.jsx';
import GameSplash from './GameSplash.jsx'


let board = [
  {x: 0, y: 0, type: "trees"}, {x: 1, y: 0, type: "trees"}, {x: 2, y: 0, type: "camp"}, {x: 3, y: 0, type: "trees"}, {x: 4, y: 0, type: "trees"},
  {x: 0, y: 1, type: "trees"}, {x: 1, y: 1, type: "trees"}, {x: 2, y: 1, type: "path"}, {x: 3, y: 1, type: "trees"}, {x: 4, y: 1, type: "trees"},
  {x: 0, y: 2, type: "path" }, {x: 1, y: 2, type: "path" }, {x: 2, y: 2, type: "berry"}, {x: 3, y: 2, type: "trees"}, {x: 4, y: 2, type: "trees"},
  {x: 0, y: 3, type: "trees"}, {x: 1, y: 3, type: "trees"}, {x: 2, y: 3, type: "path"}, {x: 3, y: 3, type: "trees"}, {x: 4, y: 3, type: "trees"},
  {x: 0, y: 4, type: "trees"}, {x: 1, y: 4, type: "trees"}, {x: 2, y: 4, type: "path"}, {x: 3, y: 4, type: "trees"}, {x: 4, y: 4, type: "trees"},
];

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: this.props.puzzle.game.grid,
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
      let playerDir = this.state.playerDir;
      if ( pendingCommands.length === 0 ) {
        if ( this.checkSquareType("camp") ) {
          this.setState({
            puzzleComplete: true
          })
        } else {
          this.resetMap();
          this.setState({
            puzzleComplete: false
          })
        }
      } else {
        let command = pendingCommands.shift();
        if (command.hasOwnProperty("movement")) {
          this.handleMovement(command, playerDir)
        }
        if (command.hasOwnProperty('pickup')) {
          console.log(this.checkSquareType(command.pickup.item))
        }
        setTimeout(function() {
          if ( this.checkSquareType("tree") ) {
            this.resetMap();
            return this.setState({
              puzzleComplete: false
            })
          }
          return execute(pendingCommands)
        }.bind(this), 1000)
      }
    }
    let stateCommands = this.state.pendingCommands
      .map(command => ({...command}))
      .map(command => {
        if ( command.hasOwnProperty("loop") ) {
          let arr = []
          for (let i = 0; i < command.loop.num; i++) {
            arr = arr.concat(command.loop.cmds)
          }
          return arr;
        } else {
          return command
        }
      })
    stateCommands = [].concat.apply([],stateCommands)
    console.log(stateCommands)
    execute(stateCommands)
  }

  handleMovement = (command, playerDir) => {
    switch (command.movement.dir) {
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
        break;
    }
    return
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

  checkSquareType = (type) => {
    //Pass this function a string and it will check if the player is on a square with a type that matches the string
    let result = false;
    let grid = this.state.display
    grid.forEach((square) => {
      if ( square.x === this.state.playerLoc.x && square.y === this.state.playerLoc.y && square.type === type ) {
        result = true;
      }
    })
    return result;
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

  renderGameSplash = () => {
    if (this.state.puzzleComplete) {
      return <GameSplash status={true} />
    }
    if (this.state.puzzleComplete === false)
      return <GameSplash status={false} />
  }

  render() {
    return (
      <div className="puzzle">
        <div className="d-flex flex-column">
          <div className="board">
            <div className="overlay">
              {this.initMap()}
            </div>
            {this.renderGameSplash()}
            <Sam playerLoc={this.state.playerLoc}/>
          </div>
          <Answer prepCommands={this.prepCommands} runCommands={this.runCommands}/>
        </div>
      </div>
    );
  }
}

export default Display;
