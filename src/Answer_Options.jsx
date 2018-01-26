import React, {Component} from 'react';

class CommandInput extends Component {
  render() {
    let buttons = this.props.commands.map(command =>
      <Command onClick={this.props.click} type={command}/>
    );
    return (
      <div className="commands">
        {buttons}
      </div>
    );
  }
}

const Command = ({type}) => {
  return (
    <button className={type}>
      {type}
    </button>
  )
}

export default CommandInput;