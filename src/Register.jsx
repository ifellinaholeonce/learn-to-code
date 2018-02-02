import React, {Component} from 'react';
import { Route, Switch, Link } from 'react-router-dom';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    };
  }
  fieldChange = field => e => {
    console.log("Target:", e.target.value)
    this.setState({[field]: e.target.value})
  };
  render() {
    const onSubmit = e => {
      e.preventDefault();
      let { firstName, lastName, email, password, passwordConfirmation} = this.state
      this.props.createUser({firstName, lastName, email, password, passwordConfirmation});
    };
    return (
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            className="form-control"
            onChange={this.fieldChange("firstName")}
            name="firstName" type="text" placeholder="First name"/>
          <input
            className="form-control"
            onChange={this.fieldChange("lastName")}
            name="lastName" type="text" placeholder="Last name"/>
          <input
            className="form-control"
            onChange={this.fieldChange("email")}
            name="email" type="email" placeholder="Email"/>
          <input className="form-control"
            onChange={this.fieldChange("password")}
            name="password"
            type="password" placeholder="Password"/>
          <input
            className="form-control"
            onChange={this.fieldChange("passwordConfirmation")}
            name="passwordConfirmation"
            type="password" placeholder="Confirm password"/>
          <input className="btn btn-primary" type="submit" value="submit"/>
        </div>
      </form>
    );
  }
}

export default RegisterForm;