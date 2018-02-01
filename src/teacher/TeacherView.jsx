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
      viewStudent: null,
      viewPuzzle: null
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
  viewPuzzle = id => e => {
    this.setState({ viewPuzzle: id })
  }
  render() {
    return (
      <div className="teacher-view">
        {!this.state.viewStudent &&
          <StudentHistory
            students={this.state.students}
            clickStudent={this.viewStudent} />}
        {this.state.viewStudent &&
          <StudentInfo
            puzzle={this.state.viewPuzzle}
            viewPuzzle={this.viewPuzzle}
            viewSummary={this.viewSummary}
            click={this.viewSummary}
            auth={this.props.auth}
            id={this.state.viewStudent} />}
      </div>
    );
  }
}

export default TeacherView;
