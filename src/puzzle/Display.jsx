import React, {Component} from 'react';
import Square from './Squares.jsx';
import Answer from './Answer.jsx';
import GameSplash from './GameSplash.jsx'
import IsometricBoard from './IsometricBoard.jsx'

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: this.props.puzzle.game.grid,
      playerLoc: this.props.puzzle.game.startLoc,
      playerDir: this.props.puzzle.game.startDir, // 1 = North, 2 = East, 3 = South, 4 = West
      pendingCommands: [],
      puzzleComplete: null
     };
  }

  componentDidMount() {
    let move = this.props.moves.find(move => move.id === this.props.moveId);
    if(move) {
      this.prepCommands(move.moves);
    }
  }

  //Expects an array of commands from Answers - forward, left, right
  prepCommands = (commands) => {
    this.setState({
      pendingCommands: commands
    })
  }

  runCommands = () => {
    let startingCommands = this.state.pendingCommands.map(command => ({...command}));
    let execute = ( pendingCommands ) => {
      let playerDir = this.state.playerDir;
      if ( pendingCommands.length === 0 ) {
        let completed = false;
        let puzzleId = this.props.puzzle.id
        if ( this.checkSquareType("camp") ) {
          let nextPuzzle = this.props.puzzles.find(puzzle => puzzle.id === this.props.puzzle.id + 1)
          let newLocation = this.props.user === "teacher" ? this.props.puzzle.game.startLoc : nextPuzzle.game.startLoc;
          let newDirection = this.props.user === "teacher" ? this.props.puzzle.game.startDir : nextPuzzle.game.startDir;
          this.setState({
            puzzleComplete: true,
            playerLoc: newLocation,
            playerDir: newDirection,
            display: nextPuzzle.game.grid
          })
          completed = true;
        } else {
          this.resetMap();
          this.setState({
            puzzleComplete: false
          })
        }

        if(this.props.user === "student") {
          let newMove = {
            puzzle_id: puzzleId,
            moves: startingCommands,
            completed
          }

          this.props.saveMove(newMove)
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
    execute(stateCommands)
  }

  handleMovement = (command, playerDir) => {
    let direction = command.movement.dir
    switch (direction) {
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
      playerDir: this.props.puzzle.game.startDir,
      playerLoc: this.props.puzzle.game.startLoc
    })
  }

  resetSplash = () => {
    this.setState({puzzleComplete: null})
  }

  render() {
    let playerLocStyle = {
      top: ((this.state.playerLoc.x - this.state.playerLoc.y) * 10)  + "%",
      left: ((this.state.playerLoc.x + this.state.playerLoc.y) * 10) + "%"
    }
    return (
      <div className="puzzle">
        {(this.state.puzzleComplete !== null && this.props.user !== "teacher") &&
          <GameSplash
            puzzleId={this.props.puzzleId}
            reset={this.resetSplash}
            status={this.state.puzzleComplete} />}
        <IsometricBoard puzzle={this.props.puzzle} playerLoc={this.state.playerLoc} playerDir={this.state.playerDir} />
        <Answer
          moves={this.props.moves}
          user={this.props.user}
          prepCommands={this.prepCommands}
          pendingCommands={this.state.pendingCommands}
          runCommands={this.runCommands}/>
      </div>
    );
  }
}

export default Display;
