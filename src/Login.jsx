import React, {Component} from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  render() {
    return (
      <form className="form">
        <div className="form-group">
          <input className="form-control" name="username" type="text" placeholder="Email or username"/>
          <input className="form-control" name="password" type="password" placeholder="Password"/>
          <input className="btn btn-primary" type="submit" value="submit"/>
        </div>
      </form>
    );
  }
}

export default LoginForm;