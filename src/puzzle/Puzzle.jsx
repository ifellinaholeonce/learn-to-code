import React, {Component} from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

import Navbar from './../Navbar.jsx';
import StudentView from './../StudentView.jsx';
import TeacherView from './../teacher/TeacherView.jsx';

class Puzzle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "teacher"
    }
  }
  componentDidMount() {
    // Fetch calls for Puzzle
  }
  render() {
    console.log("Rendering <App/>");
    return (
      <div className="body">
        { this.state.user === "teacher" ? <TeacherView/> : <StudentView/> }
      </div>
    );
  }
}

export default Puzzle;
