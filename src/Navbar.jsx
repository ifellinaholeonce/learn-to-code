import React, {Component} from 'react';
import { Route, Switch, Link } from 'react-router-dom';


class Navbar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="navbar">
        <div className="navbar-brand d-flex flex-row nav-left">
          <i className="fas fa-fire"></i>
           &nbsp;
          <p> <strong>CODE</strong> TRAIL </p>
        </div>
        <div className="nav-right">
          {this.props.user && <Link to="/"><button className="button" onClick={this.props.logout}>Logout</button></Link>}
        </div>
      </div>
    );
  }
}

export default Navbar;


