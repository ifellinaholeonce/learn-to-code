import React, {Component} from 'react';

class Hint extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hints: ['hint1','hint2','hint3'],
      numHints: 0
    }
  }

  toggleHint = (e) => {
    let newHints = this.state.numHints + 1;
    this.setState({numHints: newHints})

  }

  render() {
    console.log("Rendering <Hint/>");

    const hints = this.state.hints.filter((hint, i) => {
      return i < this.state.numHints
    }).map((hint,i) => {
      return <p key={i}>{hint}</p>
    })

    return (
      <div>
        <button onClick={this.toggleHint}> HINT: </button>
        <div className="hints">
          {hints}
        </div>
      </div>
    );
  }
}

export default Hint;
