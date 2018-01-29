import React, {Component} from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    };
  }
  render() {
    const onSubmit = (e) => {
      e.preventDefault();
      console.log(e)
    };
    return (
      <form className="form" action={onSubmit}>
        <div className="form-group">
          <input className="form-control" name="firstName" type="text" placeholder="First name"/>
          <input className="form-control" name="lastName" type="text" placeholder="Last name"/>
          <input className="form-control" name="email" type="email" placeholder="Email"/>
          <input className="form-control" name="password" type="password" placeholder="Password"/>
          <input className="btn btn-primary" type="submit" value="submit"/>
        </div>
      </form>
    );
  }
}

export default RegisterForm;