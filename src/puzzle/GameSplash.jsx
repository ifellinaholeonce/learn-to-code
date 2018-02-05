import React, {Component} from 'react';

function GameSplash({status}) {

  //status will decided content of game splash

  return (
    <div className="game-splash">
      <div className="splash outer-box">
        <div className="splash inner-box">
          <div className={"splash message " + (status ? "success" : "failure")}>First line of the success</div>
          <div className="splash message description">Second line of the success</div>
        </div>
        <span className="splash splash-title">{status ? "SUCCESS" : "OH NO"}</span>
        <div className="splash left-btn"><i className="fas fa-home"></i>  Home</div>
        {status ?
          <div className="splash right-btn">Next  <i className="fas fa-arrow-circle-right"></i></div>
          :
          <div className="splash right-btn">Retry  <i className="fas fa-arrow-alt-circle-left"></i></div>
        }
      </div>
    </div>
  )
}

export default GameSplash;