import React, {Component} from 'react';

class Command extends Component {
  render() {
    return (
      <div className={`${this.props.type} btn btn-success m-1`}>
        {this.props.type}
      </div>
    );
  }
}

export default Command;