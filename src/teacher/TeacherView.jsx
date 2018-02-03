import React, {Component} from 'react';
import { Route, Switch, Link } from 'react-router-dom';

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
  render() {
    return (
      <div className="teacher-view">
        <Switch>
          <Route path="/teacher/students" exact render={(props) => <StudentHistory {...props}
            students={this.state.students} />} />
          <Route path="/teacher/students/:id" render={(props) => <StudentInfo {...props}
            auth={this.props.auth} />} />
          }
        </Switch>
      </div>
    );
  }
}

export default TeacherView;
