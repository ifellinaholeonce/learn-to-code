import React, {Component} from 'react';
import { Route, Switch, Link } from 'react-router-dom';

// Returns a table with an overview of each students performance
class StudentHistory extends Component {
  render() {
    const clickStudent = this.props.clickStudent;
    let students = this.props.students.map(student => {
      return (
        <StudentItem
          key={student.id}
          id={student.id}
          firstName={student.first_name}
          lastName={student.last_name}
          level={student.level_reached}
          attempts={student.attempts}
        />
      )
    })
    return (
      <div className="student-history">
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

// Each row is a puzzle and the student's performance for that puzzle
function StudentItem({id, firstName, lastName, level, attempts}) {
  return (
    <tr>
      <td>{id}</td>
      <td><Link to={`/teacher/students/${id}`}>{firstName}</Link></td>
      <td>{lastName}</td>
      <td>{level}</td>
      <td>{attempts}</td>
    </tr>
  );
}

export default StudentHistory;

