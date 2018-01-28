import React, {Component} from 'react';
import CommandInput from './AnswerOptions.jsx';
import ActiveCommands from './ActiveCommands.jsx';
import Dragula from 'react-dragula'

class Answer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commands: ['forward', 'left', 'right'],
      input: []
    };
  }
  clickCommand(command) {
    let input = this.state.input.concat([command]);
    this.setState({input});
  }
  render() {
    console.log(this.state.input);
    const clickButton = type => e => {
      this.clickCommand(type);
    };
    const onClick = (e) => {
      this.props.runCommands(this.state.input);
    };
    return (
      <div className="container-fluid text-center">
        <header className="row">
          <CommandInput click={clickButton} commands={this.state.commands}/>
          <button onClick={onClick} className="col-sm-4 btn btn-warning">
            Run Commands
          </button>
        </header>
        <ActiveCommands input={this.state.input}/>
        <div className="container" ref={this.dragulaDecorator}>
          <button>One</button>
          <button>Two</button>
          <button>Three</button>
        </div>
        <div className="container" ref={this.dragulaDecorator}>
          <button>One</button>
          <button>Two</button>
          <button>Three</button>
        </div>
      </div>
    );
  }

  dragulaDecorator = ( componentTop, componentBottom  ) => {
    if ( componentTop, componentBottom ) {
      let options = { copy: true };
      Dragula([componentTop, componentBottom], options);
    }
  }
}

export default Answer;
