import React, {Component} from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

import Navbar from './Navbar.jsx';
import Puzzle from './puzzle/Puzzle.jsx';
import UserLinks from './UserLinks.jsx';
import LoginForm from './Login.jsx';
import RegisterForm from './Register.jsx';
import TeacherView from './teacher/TeacherView.jsx';
import StudentView from './StudentView.jsx';
import queryString from 'query-string';

function request(path, method,  authorization, data) {
  return fetch(`http://localhost:3000/${path}`, {
    method: method,
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': authorization
    })
  });
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "Student",
      login: false,
      register: false,
      authorization: ""
    };
  }
  componentDidMount() {
    // Fetch calls for Puzzle
    this.getUser(this.state.authorization);
  }
  getUser(authorization) {
    request("users", "GET", authorization )
      .then((res) => res.json())
      .then((data) => {
        let login = this.state.login;
        if(data.user) {
          login = !login
        }
        this.setState({ user: data.user, login })
      });
  }
  authenticateUser = (params) => {
    request("user_token", "POST", this.state.authorization, {auth: params})
      .then((res) => res.json())
      .then((res) => {
        let authorization = `Bearer ${res.jwt}`
        this.setState({ authorization })
        this.getUser( authorization );
      })
  };
  createUser = (params) => {
    fetch("register" , "POST", params)
      .then((res) => res.json())
      .then((response) => console.log("Response:", res))
  };
  toggleForm = (action) => {
    if(!this.state[action]) {
      this.setState({login: false, register: false});
    }
    this.setState({[action]: !this.state[action]});
  }
  render() {
    console.log("Rendering <App/>");
    return (
      <div className="content">
        <Navbar/>
        {!this.state.user && <UserLinks toggleForm={this.toggleForm} />}
        {this.state.login && <LoginForm authenticateUser={this.authenticateUser} />}
        {this.state.register && <RegisterForm createUser={this.createUser} />}
        {this.state.user === "Teacher" && <TeacherView />}
        {this.state.user === "Student" && <StudentView />}
      </div>
    );
  }
}

export default App;
