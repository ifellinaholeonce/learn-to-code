import React, {Component} from 'react';
import { Route, Switch, Link } from 'react-router-dom';

function GameSplash({ status, reset, puzzleId }) {

  //status will decided content of game splash
  return (
    <div className="game-splash">
      <div className="splash outer-box">
        <h1 className="splash splash-title">{status ? "SUCCESS" : "OH NO"}</h1>
        <div className="splash inner-box">
          <div className={"splash message " + (status ? "success" : "failure")}>Congrats Sam got to the camp!</div>
          <div className="splash message description">Try the next puzzle!</div>
        </div>
        <div className="splash splash-btn left"><Link to="/student"><i className="fas fa-home"></i>  Home</Link></div>
        {status ?
          <div className="splash splash-btn right"><Link onClick={reset} to={`/student/puzzles/${parseInt(puzzleId) + 1}`}>Next </Link><i className="fas fa-arrow-circle-right"></i></div>
          :
          <div onClick={reset} className="splash splash-btn right">Retry  <i className="fas fa-arrow-alt-circle-left"></i></div>
        }
      </div>
    </div>
  )
}

export default GameSplash;
