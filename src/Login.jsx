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
      <div>
      <div id="login-container" className="d-flex justify-content-center align-items-center ">
        <form className="form" onSubmit={onSubmit}>
          <div>CODE TRAIL

            <div>
               IMAGINE with all your mind &nbsp; &nbsp;
               <i className="fas fa-lightbulb"></i>
               <br/>
               BELIEVE with all your heart &nbsp; &nbsp;
               <i className="fas fa-heart"></i>
               <br/>
               ACHIEVE with all your might &nbsp;
               <i className="fab fa-hotjar"></i>
            </div>
          </div>
          <div className="form-group d-flex flex-column">
            <input
              id="username"
              className="form-control"
              onChange={onChange("username")}
              name="username"
              type="text"
              placeholder="Username"/>
            <input
              id="password"
              className="form-control"
              onChange={onChange("password")}
              name="password"
              type="password"
              placeholder="Password"/>
            <input
              id="login-btn"
              className="btn btn-primary"
              type="submit"
              value="Log In"/>
          </div>
        </form>
      </div>
      </div>
    );
  }
}

export default LoginForm;
