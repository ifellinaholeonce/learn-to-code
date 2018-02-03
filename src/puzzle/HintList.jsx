import React, {Component} from 'react';
import Hint from './Hint.jsx';

class HintList extends Component {

  render() {
    console.log("Rendering <HintList/>");

    const hints = this.props.hints;
    const numHints = this.props.numHints;

    const hintItems = hints.filter((hint, index) => {
      return index < numHints;
    }).map((hint, index) => {
      return <p key={index}>{hint}</p>
    })

    return (
      <div className="hint">
        <button className="hint-btn " onClick={this.clickHint}> HINT: </button>
        <div className="hint-text">
          {hintItems}
        </div>
      </div>
    );
  }

  clickHint = (e) => {
    this.props.handleHintClick()
  }

}

export default HintList;


