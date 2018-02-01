import React, {Component} from 'react';

class Question extends Component {
  render() {
    return (
      <div className="question">
        <button className="btn btn-success" onClick={this.props.viewSummary}>Back</button>
        <p><strong>Question: </strong> </p>
        <p>Lorem ipsum occaecat proident aliquip fugiat tempor incididunt aliqua mollit magna do nostrud sed dolore in labore. Voluptate labore nulla reprehenderit officia dolor non amet mollit consequat veniam cupidatat in.</p>
      </div>
    );
  }
}

export default Question;
