import React, {Component} from 'react';
import Dragula from 'react-dragula';

class Answer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commands: ['forward', 'left', 'right'],
      input: []
    };
    this.containers = []; //Dragula containers
  }

  componentDidMount () {
    const setInputState = (commands) => {
      this.props.prepCommands(commands)
    }

    const drake = Dragula(this.containers, {
      revertOnSpill: true,
      copy: function (el, source) {
        return source === this.containers[0];
      },
      accepts: function (el, target) {
        return target !== this.containers[0];
      }
    });

    drake.on('drop', function(el, target, source, sibling){
      let commands = [];
      for (let child of target.children) {
        commands.push(child.textContent)
      }
      setInputState(commands)
    });
  }

  render() {
    return (
      <div className="text-center">
        <header className="answers-container d-flex flex-column">
          <button onClick={this.props.runCommands} className="play-btn">
            PLAY
          </button>
        </header>
        <div className="d-flex flex-row">
          <div className="command-list d-flex flex-column" id="left"  ref={this.dragulaDecorator}>
            {this.state.commands.map((type, i) => {
              return (<Command key={i} type={type} />)
            })}
          </div>
          <div className="answer-list"  id="right"  ref={this.dragulaDecorator}>
          </div>
        </div>
      </div>
    );
  }

  dragulaDecorator = ( component ) => {
    if ( component ) {
      this.containers.push(component)
    }
  }
}

function Command({ type }) {
  return (
    <div className={`${type} m-1 jigsaw`}>
      <span className="t"></span>
      <span className="r"></span>
      <span className="b"></span>
      <span className="l"></span>
      {type}
    </div>
  )
}

export default Answer;
