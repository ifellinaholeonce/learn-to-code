
import React, {Component} from 'react';

class Sam extends Component {
  constructor(props) {
    super(props);
  }
  // 1 bottom left
  // 2 top left
  // 3 top right
  // 4 bottom right
  getDir() {
    switch(this.props.playerDir){
      case 1:
        return "player-bottom-left"
        break;
      case 2:
        return "player-top-left"
        break;
      case 3:
        return "player-top-right"
        break;
      case 4:
        return "player-bottom-right"
        break;
      default:
        console.log(this.props.playerDir, "playerDir")
        return "player-bottom-left"
        break;
    }
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
        <div className={this.getDir()}></div>
{/*       {(this.props.playerDir === 1 || this.props.playerDir === 4) && <div className="player-eye-right"></div>}
        {(this.props.playerDir === 1 || this.props.playerDir === 4) && <div className="player-eye-left"></div>}
        <div className="player-bottom"></div>
        <div className="player-feet"></div>*/}
      </div>
    )
  }
}
export default Sam;
