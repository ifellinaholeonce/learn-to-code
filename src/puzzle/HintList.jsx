import React, {Component} from 'react';
import Hint from './Hint.jsx';

class HintList extends Component {

  render() {

    const hints = this.props.hints;
    const numHints = this.props.numHints;

    const hintItems = hints.filter((hint, index) => {
      return index < numHints;
    }).map((hint, index) => {
      return <p key={index}>{hint}</p>
    })

    return (
      <div className="hint">
        <h3>Objective</h3>
        <ul>
          <li>{this.props.question}</li>
        </ul>
        <div className="hint-text">
          <button className="button hint-btn" onClick={this.props.handleHintClick}>GET HINT</button>
          {hintItems}
        </div>
      </div>
    );
  }
}

export default HintList;


