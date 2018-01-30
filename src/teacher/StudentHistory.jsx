import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

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
          clickStudent={clickStudent(student.id)}
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

// Each row is a puzzle and the student's performance for that puzzle
function StudentItem({id, firstName, lastName, level, attempts, clickStudent}) {
  return (
    <tr onClick={clickStudent}>
      <td>{id}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{level}</td>
      <td>{attempts}</td>
    </tr>
  );
}

export default StudentHistory;

