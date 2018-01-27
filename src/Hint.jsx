import React, {Component} from 'react';

class Hint extends Component {
  render() {

    console.log("Rendering <Hint/>");
    return (
       <div className="hint">
          <span className="hint-content">{this.props.hint.content}</span>
        </div>
    );
  }
}
export default Hint;
