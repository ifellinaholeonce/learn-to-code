import React, {Component} from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router-dom';

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
            user: data.type.toLowerCase(),
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
  render() {
    console.log("Rendering <App/>");
    return (
      <div className="content">
        <Navbar />
        {this.state.user &&
          <Redirect
            from="/"
            to={`/${this.state.user}/${this.state.user === "teacher" ? "students" : "puzzles"}`} />}
        <Switch>
          <Route path="/" exact render={() => <LoginForm authenticate={this.authenticateUser} />} />
          <Route path="/student" render={() => <StudentView userId={this.state.id} auth={this.state.authorization} />} />
          <Route path="/teacher" render={() => <TeacherView userId={this.state.id} auth={this.state.authorization} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
