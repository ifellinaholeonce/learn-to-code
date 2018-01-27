import React, {Component} from 'react';
import CommandInput from './AnswerOptions.jsx';

class StudentInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commands: ['forward', 'left', 'right']
    };
  }
  clickCommand(command) {
    console.log(command);
  }
  render() {
    const clickButton = type => e => {
      this.clickCommand(type);
    };
    return (
      <div className="command-line">
        <CommandInput click={clickButton("hello")} commands={this.state.commands}/>
      </div>
    );
  }
}

export default StudentInput;
