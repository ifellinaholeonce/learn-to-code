import React, {Component} from 'react';
import Command from './AnswerOptions.jsx';
import ActiveCommands from './ActiveCommands.jsx';
import Dragula from 'react-dragula'

class Answer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commands: ['forward', 'left', 'right'],
      input: []
    };
    this.containers = [] //Dragula containers
  }

  componentDidMount () {
    const drake = Dragula(this.containers, {
      revertOnSpill: true,
      copy: function (el, source) {
        return source === this.containers[0]
      },
      accepts: function (el, target) {
        return target !== this.containers[0]
      }
    });
    console.log (drake.containers[0])
  }

  clickCommand(command) {
    let input = this.state.input.concat([command]);
    this.setState({input});
  }
  render() {
    const clickButton = type => e => {
      this.clickCommand(type);
    };
    const onClick = (e) => {
      this.setState({
        input: []
      })
      this.props.runCommands(this.state.input);
    };
    return (
      <div className="text-center">
        <header className="row">
          <button onClick={onClick} className="col-sm-4 btn btn-warning">
            Run Commands
          </button>
        </header>
        <ActiveCommands input={this.state.input}/>
        <div className="row">
          <div className="col-md-3 command-list" id="left"  ref={this.dragulaDecorator}>
            {this.state.commands.map( (type) => {
              console.log(type)
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
