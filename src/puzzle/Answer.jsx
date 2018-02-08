import React, {Component} from 'react';
import Dragula from 'react-dragula';
import DisplaySequence from './DisplaySequence.jsx';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import TeacherStudentMoves from './TeacherStudentMoves.jsx';
import ActionsList from './ActionsList.jsx';


class Answer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      commands: [
        {movement: {dir: 'forward'}},
        {movement: {dir: 'left'}},
        {movement: {dir: 'right'}}],
      items: ['berry', 'wood'],
      input: [],
      numLoops: 1,
      viewMove: null
    };
  }

  componentDidMount () {
    const setInputState = (commands) => {
      this.props.prepCommands(commands)
    }

    const querySelectorAllArray = (selector) => {
      return Array.prototype.slice.call(
        document.querySelectorAll(selector), 0
      );
    }

    const contains = (a, b) => {
      return a.contains ? a != b && a.contains(b) : !!(a.compareDocumentPosition(b) & 16)
    }

    const drake = Dragula(querySelectorAllArray('.drake-container'), {
      removeOnSpill: true,
      copy: function (el, source) {
        return source === this.containers[0];
      },
      accepts: function (el, target) {
        if ( target.id === "pickup") {
          return target !== this.containers[0] && !contains(el,target) && el.className.indexOf("pickup") >= 0
        } else {
          return target !== this.containers[0] && !contains(el,target);
        }
      }
    });

    drake.on('drop', function(el, target, source, sibling) {
      //If the user dropped into a "pickup", clear any children it might have first.
      if (target.id === "pickup") {
        target.appendChild(el)
        if (target.children.length > 1) {
          target.removeChild(target.firstChild)
        }
      }

      //If the user dropped a loop element, clear the source of children
      if (el.id === "loop") {
        source.childNodes.forEach((child) => {
          if (child.id === el.id) {
            let container = child.lastChild;
            while (container.firstChild) {
              container.removeChild(container.firstChild)
            }
          }
        })
      }
      //Initialize an array for commands to push to state
      let commands = [];
      for (let child of target.children) {
        //Parse pickup commands
        if (child.id === "pickup") {
          let pickup = {
            pickup: {
              "item": child.lastChild.firstChild.textContent.toLowerCase()
            }};
          commands.push(pickup)
        } else
        //Parse loop commands
        if (child.id === "loop") {
          let loop = {
            loop: {
              num: 2,
              cmds: []
            }
          }
          for (let loopChild of child.lastChild.children) {
            if (loopChild.id === "pickup") {
              let pickup = {
                pickup: {
                  "item": loopChild.lastChild.firstChild.textContent.toLowerCase()
              }};
              loop.loop.cmds.push(pickup);
            } else {
              let movement = {
                movement : {
                  dir: loopChild.textContent.toLowerCase()
                }
              }
              loop.loop.cmds.push(movement)
            }
          }
          commands.push(loop)
        } else {
          let movement = {
            movement: {
              dir: child.textContent.toLowerCase()
            }
          }
          commands.push(movement)
        }
      }

      //Moves the dropped command to a higher scope that can push the command to state
      if (target.id === "right"){
        setInputState(commands)
      }
    });
  }

  viewMove = moveId => e => {
    let newMove = this.state.viewMove === moveId ? null : moveId;
    let move = this.props.moves.find(move => move.id === moveId)
    this.setState({ viewMove: moveId })
    this.props.prepCommands(move.moves)
  }

  render() {
    return (
      <div className="commands-display">
        <button onClick={this.props.runCommands} className="play-btn">
          PLAY
        </button>
        <div className="commands-row">
        <Switch>
          <Route path="/teacher/students/:studentId/puzzle/:puzzleId" render={(props) =>
            <TeacherStudentMoves {...props} viewMove={this.viewMove} moves={this.props.moves} />} />
          <Route path="/student/puzzles/:puzzleId" render={(props) =>
            <ActionsList {...props} commands={this.state.commands} items={this.state.items} />} />
        </Switch>
          <div className="commands-list drake-container"  id="right">
            {this.state.viewMove && this.props.moves.find(move => move.id === this.state.viewMove).moves.map((move, i) =>
                <DisplaySequence type="command" key={i} i={i} move={move} />) }
          </div>
        </div>
      </div>
    );
  }
}

function Command({ type, content }) {
  return (
    <div className={`${content} ${type} action`}>
      {content}
    </div>
  )
}

export default Answer;
