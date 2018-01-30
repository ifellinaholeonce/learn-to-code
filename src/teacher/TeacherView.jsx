import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import StudentHistory from './StudentHistory.jsx';
import StudentInfo from './StudentInfo.jsx';

// Client-side model
import Resource from '../../models/resource';
const Students = Resource('students');

class TeacherView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      viewStudent: false
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
    this.setState({viewStudent: studentId})
  }
  render() {
    return (
      <div className="teacher-view">
        {!this.state.viewStudent && <StudentHistory students={this.state.students} clickStudent={this.clickStudent} />}
        {this.state.viewStudent && <StudentInfo id={this.state.viewStudent}/>}
      </div>
    );
  }
}

export default TeacherView;
