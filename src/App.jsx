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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "teacher",
      login: false,
      register: false
    };
  }
  componentDidMount() {
    // Fetch calls for Puzzle
  }
  authenticateUser = (params) => {
    fetch("http://localhost:3000/login" , {method: "POST", body: JSON.stringify(params)})
      .then((res) => {
        res.json();
      }).then((res) => {
        console.log("Response:", res);
      });
  };
  createUser = (params) => {
    fetch("http://localhost:3000/register" , {method: "POST", body: JSON.stringify(params)})
      .then((res) => {
        res.json();
      }).then((response) => {
        console.log("Response:", res);
      })
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
        {this.state.user === "teacher" && <TeacherView />}
        {this.state.user === "student" && <StudentView />}
      </div>
    );
  }
}

export default App;
