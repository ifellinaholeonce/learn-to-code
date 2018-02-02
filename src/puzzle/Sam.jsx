
import React, {Component} from 'react';

class Sam extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let playerLocStyle = {
      top: (this.props.playerLoc.y * 20) + "%",
      left: (this.props.playerLoc.x * 20) + "%",
    }
    return (
      <div className="player" style={playerLocStyle}>
        <div className="player-top"></div>
        <div className="player-eye-right"></div>
        <div className="player-eye-left"></div>
        <div className="player-bottom"></div>
        <div className="player-feet"></div>
      </div>
    )
  }
}
export default Sam;
