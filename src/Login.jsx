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
      this.changeInput(type, e.target.value);
    };
    const onSubmit = e => {
      e.preventDefault();
      let email = e.target.username.value;
      let password = e.target.password.value;
      this.props.authenticateUser({email, password});
    };
    return (
      <div>
      <div id="login-container" className="d-flex justify-content-center align-items-center ">
        <form className="form d-flex flex-column align-items-center" onSubmit={onSubmit}>

              <div id="banner">
                CODE TRAIL
              </div>

              <div id='slogan' className='d-flex flex-column'>
                <div id='imagine' className='d-flex flex-row justify-content-center'>
                 <em> IMAGINE with all your mind &nbsp; </em>
                 <i className="fas fa-lightbulb"></i>
                </div>

                 <div id='believe' className='d-flex flex-row justify-content-center'>
                 <em> BELIEVE with all your heart &nbsp; </em>
                 <i className="fas fa-heart"></i>
                 </div>

                 <div id='achieve' className='d-flex flex-row justify-content-center'>
                 <em> ACHIEVE with all your might &nbsp; </em>
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
