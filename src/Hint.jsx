import React, {Component} from 'react';

class Hint extends Component {
  render() {

    return (
      <div>
        <button onClick={this.toggleHint}> HINT: </button>
        <div className="hints">
        </div>
      </div>
    );
  }

  toggleHint = (e) => {
    const hintsArr = ['hint1','hint2','hint3']

    // let node = document.createElement("p")
    // let textnode = document.createTextNode("hint1");
    // node.appendChild(textnode);
    // e.target.parentNode.childNodes[1].appendChild(node)

    // console.log(e.target.parentNode.childNodes[1].firstChild)
    let numOfClick = 0;

    hintsArr.forEach( (hint, index) => {
      if (numOfClick === index) {
        let node = document.createElement("p")
        let textnode = document.createTextNode(hint);
        node.appendChild(textnode);

        e.target.parentNode.childNodes[1].appendChild(node)
        numOfClick ++;
      }
    });

  }
}

export default Hint;
