import React, {Component} from 'react';

class Question extends Component {
  render() {
    let instructions = "";
    return (
      <div className="question">
        <h3>Instructions</h3>
        <ul>
          <li>Drag and drop commands into the window on the right.</li>
          <li>Forward will move Sam one space in the direction he is facing, and left and right will turn him counter-clockwise and clockwise respectively.</li>
          <li>Stay on the path or you'll get lost in the woods and have to start again.</li>
        </ul>
      </div>
    );
  }
}

export default Question;
