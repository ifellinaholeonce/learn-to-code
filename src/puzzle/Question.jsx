import React, {Component} from 'react';

class Question extends Component {
  render() {
    return (
      <div className="question">
        Drag and drop commands into the window on the right. Forward will move sam one space in the direction he is facing, and left and right will turn him counter-clockwise and clockwise respectively. Stay on the path or you'll get lost in the woods and have to start again.
        <p>{this.props.question}</p>
      </div>
    );
  }
}

export default Question;
