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
      <div className="answer container text-center">
        <header className="row">
          <CommandInput click={clickButton} commands={this.state.commands}/>
          <div className="col-sm-4">
            <button onClick={onClick} className="btn btn-warning m-1">
              Run Commands
            </button>
          </div>
        </header>
        <ActiveCommands input={this.state.input}/>
      </div>
    );
  }
}

export default Answer;