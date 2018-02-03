import React, {Component} from 'react';

class Command extends Component {
  render() {
    return (
      <div className={`${this.props.type} m-1 jigsaw`}>
        <span className="t"></span>
        <span className="r"></span>
        <span className="b"></span>
        <span className="l"></span>
        <span className="text">{this.props.type}</span>
      </div>
    );
  }
}

export default Command;
