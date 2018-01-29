import React, {Component} from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

import Navbar from './Navbar.jsx';
import Puzzle from './Puzzle.jsx';
import UserLinks from './UserLinks.jsx';
import LoginForm from './Login.jsx';
import RegisterForm from './Register.jsx';
import TeacherView from './TeacherView.jsx';
import StudentView from './StudentView.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "student",
      login: false,
      register: false
    };
  }
  componentDidMount() {
    // Fetch calls for Puzzle
  }
  authenticateUser = (param) => {

  }
  createUser = (params) => {

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
        {this.state.user || <UserLinks toggleForm={this.toggleForm} />}
        {this.state.login && <LoginForm onClick={this.authenticateUser} />}
        {this.state.register && <RegisterForm onClick={this.createUser} />}
        {this.state.user && this.state.user === "teacher" ? <TeacherView /> : <StudentView />}
      </div>
    );
  }
}

export default App;
