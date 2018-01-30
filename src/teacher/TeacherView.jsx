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
    console.log("Mouting component")
    Students.findAll() // ProductStore does the API fetching!
      .then((result) => { this.setState({students: result, errors: null}); })
      .catch((errors) => this.setState({errors: errors}));
  }
  render() {
    return (
      <div className="teacher-view">
        <StudentHistory students={this.state.students} />
      </div>
    );
  }
}

export default TeacherView;
