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
  changeInput(type, value) {
    this.setState({[type]: value});
  }
  submitForm(params) {

  }
  render() {
    const onChange = type => e => {
      changeInput(type, e.target.value);
    };
    const onSubmit = e => {
      e.preventDefault();
      let username = e.target.username.value;
      let password = e.target.username.password;
      this.props.authenticateUser({username, password});
    };
    return (
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            className="form-control"
            onChange={onChange("username")}
            name="username"
            type="text"
            placeholder="Email or username"/>
          <input
            className="form-control"
            onChange={onChange("password")}
            name="password"
            type="password"
            placeholder="Password"/>
          <input className="btn btn-primary" type="submit" value="Submit"/>
        </div>
      </form>
    );
  }
}

export default LoginForm;