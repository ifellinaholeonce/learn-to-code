import React, {Component} from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import StudentHistory from './StudentHistory.jsx';
import StudentInfo from './StudentInfo.jsx';
import request from '../../models/resource.js'

class TeacherView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
    };
  }
  componentDidMount() {
    this.getStudents();
  }
  getStudents = () => {
    request(`students`, "GET", this.props.auth)
      .then((data) => {
        this.setState({students: data, errors: null}); })
      .catch((errors) => this.setState({errors: errors}));
  }
  render() {
    return (
      <div className="teacher-view">
        <Route path="/teacher" exact render={() => <Redirect to="/teacher/students" />} />
        <Switch>
          <Route path="/teacher/students" exact render={(props) => <StudentHistory {...props}
            auth={this.props.auth}
            getStudents={this.getStudents}
            students={this.state.students}
            addStudent={this.addStudent} />} />
          <Route path="/teacher/students/:id" render={(props) => <StudentInfo {...props}
            auth={this.props.auth} />} />
          }
        </Switch>
      </div>
    );
  }
}

export default TeacherView;
