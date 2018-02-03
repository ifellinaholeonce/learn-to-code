import React, {Component} from 'react';

function GameSplash({status}) {

  //status will decided content of game splash

  return (
    <div className="game-splash">
      <div className="splash outer-box">
        <div className="splash inner-box">
          <div className="splash message success">First line of the success</div>
          <div className="splash message description">Second line of the success</div>
        </div>
        <span className="splash splash-title">SUCCESS</span>
        <div className="splash left-btn">Home</div>
        <div className="splash right-btn">Next</div>
      </div>
    </div>
  )
}

export default GameSplash;
