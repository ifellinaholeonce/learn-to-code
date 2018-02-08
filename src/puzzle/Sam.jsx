
import React, {Component} from 'react';

class Sam extends Component {
  constructor(props) {
    super(props);
  }

  getDir() {
    if ( this.props.playerDir === 3 || this.props.playerDir === 4 ) {
      return -1
    }
    return 1
  }

  render() {
    let playerLocStyle = {
      zIndex: ( (4 - this.props.playerLoc.y) * 5 + (4 - this.props.playerLoc.x) + 1),
      top: (35 - 5 * this.props.playerLoc.x - 5 * this.props.playerLoc.y) + "em",
      left: (37 - 8.6 * this.props.playerLoc.x + 8.6 * this.props.playerLoc.y) + "em",
      transform: `scaleX(${this.getDir()})`,
    }
    return (
      <div className="player" style={playerLocStyle}>
        <div className="player-top"></div>
        {(this.props.playerDir === 1 || this.props.playerDir === 4) && <div className="player-eye-right"></div>}
        {(this.props.playerDir === 1 || this.props.playerDir === 4) && <div className="player-eye-left"></div>}
        <div className="player-bottom"></div>
        <div className="player-feet"></div>
      </div>
    )
  }
}
export default Sam;
