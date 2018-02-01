import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import StudentHistory from './StudentHistory.jsx';
import StudentInfo from './StudentInfo.jsx';
import request from '../../models/resource.js'

class TeacherView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      viewStudent: null
    };
  }
  componentDidMount() {
    request(`students`, "GET", this.props.auth)
      .then((data) => {
        this.setState({students: data, errors: null}); })
      .catch((errors) => this.setState({errors: errors}));
  }
  viewStudent = studentId => e => {
    this.setState({viewStudent: studentId})
  }
  viewSummary = () => {
    this.setState({ viewStudent: null })
  }
  render() {
    return (
      <div className="teacher-view">
        {!this.state.viewStudent && <StudentHistory students={this.state.students} clickStudent={this.viewStudent} />}
        {this.state.viewStudent && <StudentInfo click={this.viewSummary} auth={this.props.auth} id={this.state.viewStudent}/>}
      </div>
    );
  }
}

export default TeacherView;
