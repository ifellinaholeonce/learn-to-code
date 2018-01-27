import React, {Component} from 'react';

class AnswerOptions extends Component {
  render() {
    let buttons = this.props.commands.map(command =>
      <Command onClick={this.props.click} type={command}/>
    );
    return (
      <div className="commands col-sm-8 container">
        {buttons}
      </div>
    );
  }
}

const Command = ({type, onClick}) => {
  return (
    <button onClick={onClick(type)} className={`${type} btn btn-success m-1`}>
      {type}
    </button>
  )
}

export default AnswerOptions;