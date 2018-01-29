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
      <div className="container col-4">
        <button className="btn btn-success" onClick={this.clickHint}> HINT: </button>
        <div className="hints">
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


