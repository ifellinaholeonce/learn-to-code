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
      <div>
        <button onClick={this.toggleHint}> HINT: </button>
        <div className="hints">
          {hintItems}
        </div>
      </div>
    );
  }
}

export default HintList;


  // toggleHint = (e) => {
  //   let newHints = this.state.numHints + 1;
  //   this.setState({numHints: newHints})

  // }
