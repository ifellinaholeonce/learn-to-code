import React, {Component} from 'react';
import CommandInput from './Answer_Options.jsx';

class StudentInput extends Component {
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
    return (
      <div className="command-line">
        <CommandInput click={clickButton} commands={this.state.commands}/>
      </div>
    );
  }
}

export default StudentInput;