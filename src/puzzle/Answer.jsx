import React, {Component} from 'react';
import Dragula from 'react-dragula';

class Answer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commands: ['forward', 'left', 'right'],
      items: ['berry', 'wood'],
      input: []
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
            let container = child.firstChild;
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
          for (let loopChild of child.firstChild.children) {
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
      <div className="text-center">
        <header className="answers-container d-flex flex-column">
          <button onClick={this.props.runCommands} className="play-btn">
            PLAY
          </button>
        </header>
        <div className="row">
          <div className="col-md-3 command-list drake-container" id="left">
            {this.state.commands.map( (move) => {
              return (<Command type={"movement"} content={move} />)
            })}
            {this.state.items.map( (item) => {
              return (<Command type="pickup" content={item} />)
            })}
            <div className="looper" id="loop">
              <div className="looper-container drake-container"></div>
            </div>
            <div className="looper" id="pickup">
              <label>Pick Up</label>
              <div className="looper-container drake-container" id="pickup"></div>
            </div>
          </div>
          <div className="col-md-3 answer-list drake-container"  id="right"></div>
        </div>
      </div>
    );
  }

  dragulaDecorator = ( component ) => {
    if ( component ) {
      this.containers.push(component)
    }
  }
}

function Command({ type, content }) {
  return (
    <div className={`${type} m-1 jigsaw`}>
      <span className="t"></span>
      <span className="r"></span>
      <span className="b"></span>
      <span className="l"></span>
      {content}
    </div>
  )
}

export default Answer;
