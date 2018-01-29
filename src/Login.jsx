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
      console.log(e);
      onChange(e);
    }
    return (
      <form className="form" action={onSubmit}>
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
          <input className="btn btn-primary" type="submit" value="submit"/>
        </div>
      </form>
    );
  }
}

export default LoginForm;