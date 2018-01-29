import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// import StudentItem from './StudentItem.jsx'

class StudentHistory extends Component {
  render() {
    let students = this.props.students.map(student => {
      return (
        <StudentItem
          id={student.id}
          firstName={student.first_name}
          lastName={student.last_name}
          level={student.level_reached}
          attempts={student.attempts}
        />
      )
    })
    return (
      <div className="student-history container">
        <h2 className="display-6">Your Class</h2>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">#</th>
              <th>First</th>
              <th>Last</th>
              <th>Level reached</th>
              <th>Attempts</th>
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

function StudentItem({id, firstName, lastName, level, attempts}) {
  return (
    <tr>
      <td>{id}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{level}</td>
      <td>{attempts}</td>
    </tr>
  );
}

export default StudentHistory;

