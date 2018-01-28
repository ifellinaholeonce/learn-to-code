import React, {Component} from 'react';


class Navbar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="navbar">
        <p className="navbar-brand">
          <i className="fas fa-fire"></i>
           &nbsp;
          <strong>CODE</strong> TRAIL
        </p>

      </div>
    );
  }
}

export default Navbar;


