import React, {Component} from 'react';


class Navbar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="navbar">
        <div className="navbar-brand d-flex flex-row">
          <i className="fas fa-fire"></i>
           &nbsp;
          <p> <strong>CODE</strong> TRAIL </p>
        </div>

      </div>
    );
  }
}

export default Navbar;


