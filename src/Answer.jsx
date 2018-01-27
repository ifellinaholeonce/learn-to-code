import React, {Component} from 'react';
import CommandInput from './AnswerOptions.jsx';
import ActiveCommands from './ActiveCommands.jsx';

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
      <div className="container text-center">
        <button onClick={onClick} className="btn btn-warning">
          Run Commands
        </button>
        <CommandInput click={clickButton} commands={this.state.commands}/>
        <ActiveCommands input={this.state.input}/>
      </div>
    );
  }
}

export default Answer;