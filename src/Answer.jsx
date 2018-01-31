import React, {Component} from 'react';
import Command from './AnswerOptions.jsx';
import ActiveCommands from './ActiveCommands.jsx';
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

    const drake = Dragula(this.containers, {
      revertOnSpill: true,
      copy: function (el, source) {
        return source === this.containers[0];
      },
      accepts: function (el, target) {
        return target !== this.containers[0];
      }
    });
    
    drake.on('drop', function(el, target, source, sibling){
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
          {/*<CommandInput click={clickButton} commands={this.state.commands}/>*/}
          <button onClick={onClick} className="col-sm-4 btn btn-warning">
            Run Commands
          </button>
        </header>
        <div className="row">
          <div className="col-md-3 command-list" id="left"  ref={this.dragulaDecorator}>
            {this.state.commands.map( (type) => {
              return (<Command type={type} />)
            })}
          </div>
          <div className="col-md-3 answer-list"  id="right"  ref={this.dragulaDecorator}>
          </div>
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
