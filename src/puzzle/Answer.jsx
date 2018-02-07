import React, {Component} from 'react';
import Dragula from 'react-dragula';
import DisplaySequence from './DisplaySequence.jsx';

const addItem = (commandList, actionList, startIndex, endIndex) => {
  const result = commandList.slice();
  const actions = actionList.slice()
  const removed = actions[startIndex];
  result.splice(endIndex, 0, Object.assign({}, removed));
  if(removed.loop) {
    let next = result.reduce((acc, command) => Math.max(acc, command.dropId || 0 ), 0) + 1
    actions.splice(3, 1);
    let newLoop = {loop: {num: 2, cmds: []}, dropId: next}
    actions.splice(3, 0, newLoop)
  }

  return {pending: result, commands: actions};
}

const addItemToLoop = (commandList, actionList, startIndex, endIndex) => {
  const result = commandList.slice();
  let loop = result.find((move) => move.loop)
  const removed = actionList[startIndex];
  loop.loop.cmds.push(removed)

  return result;
}

const reorder = (commandList, startIndex, endIndex) => {
  const result = commandList.slice();
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const deleteItem = (commandList, startIndex) => {
  let result = commandList.slice();
  result.splice(startIndex, 1);

  return result;
}

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
      numLoops: 1
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
              "item": child.lastChild.firstChild.textContent
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
                  "item": loopChild.lastChild.firstChild.textContent
              }};
              loop.loop.cmds.push(pickup);
            } else {
              let movement = {
                movement : {
                  dir: loopChild.textContent
                }
              }
              loop.loop.cmds.push(movement)
            }
          }
          commands.push(loop)
        } else {
          let movement = {
            movement: {
              dir: child.textContent
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

  render() {
    return (
      <div className="commands-display">
        <button onClick={this.props.runCommands} className="play-btn">
          PLAY
        </button>
        <div className="commands-row">
          <div className="available-actions command-list drake-container" id="left">
            {this.state.commands.map((move, i) =>
                <DisplaySequence type="action" key={i} move={move} />
              )}
            {this.state.items.map((item, i) => {
              return (<DisplaySequence type="pickup" key={i} move={null} content={item} />)
            })}
            <div className="looper action a-loop" id="loop">
              Loop
              <div className="looper-container drake-container"></div>
            </div>
            <div className="looper action a-function" id="pickup">
              Pick Up
              <div className="looper-container drake-container" id="pickup"></div>
            </div>
          </div>
          <div className="commands-list drake-container"  id="right">
            {/*this.props.pendingCommands &&
              this.props.pendingCommands.map((move, i) =>
                <DisplaySequence type="command" key={i} i={i} move={move} />)*/}
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
