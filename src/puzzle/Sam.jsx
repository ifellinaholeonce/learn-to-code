
import React, {Component} from 'react';

class Sam extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let playerLocStyle = {
      zIndex: ( (4 - this.props.playerLoc.y) * 5 + (4 - this.props.playerLoc.x) + 1),
      top: (35 - 5 * this.props.playerLoc.x - 5 * this.props.playerLoc.y) + "em",
      left: (37 - 8.6 * this.props.playerLoc.x + 8.6 * this.props.playerLoc.y) + "em",
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
