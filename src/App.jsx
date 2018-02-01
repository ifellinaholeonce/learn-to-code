import React, {Component} from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

import Navbar from './Navbar.jsx';
import Puzzle from './puzzle/Puzzle.jsx';
import LoginForm from './Login.jsx';
import TeacherView from './teacher/TeacherView.jsx';
import StudentView from './StudentView.jsx';
import queryString from 'query-string';
import request from '../models/resource'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      user: "",
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
      .then((data) => {
        let login = this.state.login;
        if(data && data.type) {
          login = !login
          this.setState({
            user: data.type,
            id: data.id,
            login
          })
        }
      });
  }
  authenticateUser = (params) => {
    request("user_token", "POST", this.state.authorization, {auth: params})
      .then((res) => {
        let authorization = `Bearer ${res.jwt}`
        this.setState({ authorization })
        this.getUser( authorization );
      })
  };
  createUser = (params) => {
    fetch("register" , "POST", params)
      .then((response) => console.log("Response:", res))
  };
  toggleForm = (action) => {
    if(!this.state[action]) {
      this.setState({login: false, register: false});
    }
    this.setState({[action]: !this.state[action]});
  }

  // Comment out UsserLinks && Register because we might not need that anymore.
  render() {
    console.log("Rendering <App/>");
    return (
      <div className="content">
        <Navbar/>
        {!this.state.user && <LoginForm authenticateUser={this.authenticateUser} />}
        {this.state.user === "Teacher" && <TeacherView id={this.state.id} auth={this.state.authorization}/>}
        {this.state.user === "Student" && <StudentView id={this.state.id} auth={this.state.authorization} />}
      </div>
    );
  }
}

export default App;
