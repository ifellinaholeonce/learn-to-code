import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class StudentHistory extends Component {
  render() {
    return (
      let students = this.props.students.map(student => {
        return (<StudentItem />)
      })
      <div className="student-history">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Level reached</th>
              <th>Total attempts</th>
            </tr>
          </thead>
          <tbody>
            {students}
          </tbody>
        </table>
      </div>
    );
  }
}

export default StudentHistory;