import React, {Component} from 'react';
import { Route, Switch, Link } from 'react-router-dom';

let board = [
  {x: 0, y: 0, type: "trees"}, {x: 1, y: 0, type: "trees"}, {x: 2, y: 0, type: "camp"}, {x: 3, y: 0, type: "trees"}, {x: 4, y: 0, type: "trees"},
  {x: 0, y: 1, type: "trees"}, {x: 1, y: 1, type: "trees"}, {x: 2, y: 1, type: "path"}, {x: 3, y: 1, type: "trees"}, {x: 4, y: 1, type: "trees"},
  {x: 0, y: 2, type: "path" }, {x: 1, y: 2, type: "path" }, {x: 2, y: 2, type: "path"}, {x: 3, y: 2, type: "trees"}, {x: 4, y: 2, type: "trees"},
  {x: 0, y: 3, type: "trees"}, {x: 1, y: 3, type: "trees"}, {x: 2, y: 3, type: "path"}, {x: 3, y: 3, type: "trees"}, {x: 4, y: 3, type: "trees"},
  {x: 0, y: 4, type: "trees"}, {x: 1, y: 4, type: "trees"}, {x: 2, y: 4, type: "path"}, {x: 3, y: 4, type: "trees"}, {x: 4, y: 4, type: "trees"},
];

class IsometricBoard extends Component {
  render() {
    board.sort((a, b) => {
      if(a.y < b.y) {
        return 1
      } else if(a.y === b.y) {
        return b.x - a.x
      } else {
        return -1
      }
    })
    let squares = board.map((square, i) => {
      return (
        <div id={`Cube${i+1}`} className={`Cube Cube--typeSolo Theme-Woods Cube${i+1}`}>
          <div className="CubeInterior">
            <div className="FaceWrapper" data-face="top">
              <div className="SvgContainer Face Face--typeTop">
              </div>
            </div>
            <div className="FaceWrapper" data-face="right">
              <div className="SvgContainer Face Face--typeRight">
                <svg viewBox="0 0 80 80" className="Svg Svg--rotate180">
                  <use xmlns="http://www.w3.org/1999/xlink" href="#SVGPieceLine">
                  </use>
                </svg>
              </div>
            </div>
            <div className="FaceWrapper" data-face="left">
              <div className="SvgContainer Face Face--typeLeft">
                <svg viewBox="0 0 80 80" className="Svg Svg--rotate180">
                  <use xmlns="http://www.w3.org/1999/xlink" href="#SVGPieceLine">
                  </use>
                </svg>
              </div>
            </div>
            <div className="SvgContainer Outline Outline--typeCube">
              <svg className="Svg CubeOutline CubeOutline--typeLeft" viewBox="0 0 180 207">
                <use xmlns="http://www.w3.org/1999/xlink" href="#SVGCubeOutlineLeft">
                </use>
              </svg>
              <svg className="Svg CubeOutline CubeOutline--typeRight" viewBox="0 0 180 207">
                <use xmlns="http://www.w3.org/1999/xlink" href="#SVGCubeOutlineRight">
                </use>
              </svg>
              <svg className="Svg CubeOutline CubeOutline--typeTop" viewBox="0 0 180 207">
                <use xmlns="http://www.w3.org/1999/xlink" href="#SVGCubeOutlineTop">
                </use>
              </svg>
            </div>
          </div>
          {square.type !== "path" && <img src={`../../img/${square.type}.svg`}/>}
        </div>
      )
    })
    return (
      <div className="game-board">
        <div id="InjectSVG" className="visuallyhidden">
          <svg xmlns="http://www.w3.org/2000/svg">
            <symbol id="SVGCubeOutlineLeft" viewBox="0 0 180 207">
              <path d="M92.005 100.515l-85.738-49.5a4.009 4.009 0 0 0-6.016 3.474v99c0 1.433.765 2.758 2.005 3.474l85.737 49.5c1.228.71 2.783.71 4.011 0a4.011 4.011 0 0 0 2.005-3.473l.001-99.001a4.013 4.013 0 0 0-2.005-3.474zm-6.018 95.527L8.272 151.173V61.436l77.715 44.869v89.737z">

              </path>
            </symbol>
            <symbol id="SVGCubeOutlineRight" viewBox="0 0 180 207">
              <path d="M179.747 54.488a4.013 4.013 0 0 0-6.017-3.474l-85.737 49.5a4.011 4.011 0 0 0-2.006 3.474l-.001 99a4.011 4.011 0 0 0 6.018 3.474l85.741-49.502a4.011 4.011 0 0 0 2.006-3.474l-.004-98.998zM94.009 196.041l.001-89.736 77.715-44.869.003 89.735-77.719 44.87z">

              </path>
            </symbol>
            <symbol id="SVGCubeOutlineTop" viewBox="0 0 180 207">
              <path d="M177.741 51.015L92.005 1.514a4.011 4.011 0 0 0-4.011 0L2.256 51.015a4.01 4.01 0 0 0 0 6.948l85.738 49.5a4.013 4.013 0 0 0 4.012 0l85.737-49.5a4.01 4.01 0 0 0-.002-6.948zM89.999 99.356L12.284 54.488 89.999 9.619l77.715 44.869-77.715 44.868z">

              </path>
            </symbol>
          </svg>
        </div>
        {squares}
      </div>
    )
  }
}

export default IsometricBoard