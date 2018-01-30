import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import StudentHistory from './StudentHistory.jsx';

// Client-side model
import Resource from '../../models/resource';
const Students = Resource('students');

class TeacherView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: []
    };
  }
  componentDidMount() {
    console.log("Mouting TeacherView");
    fetch("http://localhost:3000/students")
      .then((res) => res.json())
      .then((data) => {
        console.log("The data:", data)
        this.setState({students: data, errors: null}); })
      .catch((errors) => this.setState({errors: errors}));
  }
  clickStudent = studentId => e => {
    console.log("You clicked a student:", studentId)
  }
  render() {
    return (
      <div className="teacher-view">
        <StudentHistory students={this.state.students} clickStudent={this.clickStudent} />
      </div>
    );
  }
}

export default TeacherView;
