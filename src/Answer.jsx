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
          <CommandInput click={clickButton} commands={this.state.commands}/>
          <button onClick={onClick} className="col-sm-4 btn btn-warning">
            Run Commands
          </button>
        </header>
        <ActiveCommands input={this.state.input}/>
      </div>
    );
  }
}

export default Answer;
