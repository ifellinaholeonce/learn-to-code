import React, {Component} from 'react';
import { Route, Switch, Link } from 'react-router-dom';

function GameSplash({ status, reset, puzzleId }) {

  //status will decided content of game splash
  return (
    <div className="game-splash">
      <div className="splash outer-box">
        <div className="splash inner-box">
          <div className={"splash message " + (status ? "success" : "failure")}>First line of the success</div>
          <div className="splash message description">Second line of the success</div>
        </div>
        <span className="splash splash-title">{status ? "SUCCESS" : "OH NO"}</span>
        <div className="splash left-btn"><Link to="/student"><i className="fas fa-home"></i>  Home</Link></div>
        {status ?
          <div className="splash right-btn"><Link onClick={reset} to={`/student/puzzles/${parseInt(puzzleId) + 1}`}>Next</Link><i className="fas fa-arrow-circle-right"></i></div>
          :
          <div onClick={reset} className="splash right-btn">Retry  <i className="fas fa-arrow-alt-circle-left"></i></div>
        }
      </div>
    </div>
  )
}

export default GameSplash;
