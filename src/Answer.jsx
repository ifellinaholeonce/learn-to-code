import React, {Component} from 'react';
import Command from './AnswerOptions.jsx';
import Dragula from 'react-dragula';

class Answer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commands: ['forward', 'left', 'right'],
      input: []
    };
    this.containers = []; //Dragula containers
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
        return target !== this.containers[0] && !contains(el,target);
      }
    });

    drake.on('drop', function(el, target, source, sibling){
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
      let commands = [];
      for (let child of target.children) {
        commands.push(child.textContent)
      }
      setInputState(commands)
    });
  }



  render() {
    return (
      <div className="text-center">
        <header className="row flex-sm-row">
          <button onClick={this.props.runCommands} className="col-sm-4 btn btn-warning">
            Run Commands
          </button>
        </header>
        <div className="row">
          <div className="col-md-3 command-list drake-container" id="left">
            {this.state.commands.map( (type) => {
              return (<Command type={type} />)
            })}
            <div className="looper" id="loop">
              <div className="looper-container drake-container"></div>
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

export default Answer;
