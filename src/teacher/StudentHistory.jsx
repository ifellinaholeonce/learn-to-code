import React, {Component} from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import AddStudent from './AddStudent.jsx';
import request from '../../models/resource.js'

// Returns a table with an overview of each students performance
class StudentHistory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addStudent: false,
      firstName: "",
      lastName: "",
      username: "",
      email: ""
    }
  }
  createStudent = e => {
    e.preventDefault();
    let { firstName, lastName, username, password } = e.target;
    request("students", "POST", this.props.auth, {
      student: {
        first_name: firstName.value,
        last_name: lastName.value,
        email: username.value,
        password: password.value
      }
    })
    .then((res) => {
      if(res) {
        this.props.getStudents();
        this.cancel()
      } else {
        console.log("Couldn't save")
      }
    })
  }
  cancel = () => {
    this.setState({
      addStudent: false,
      firstName: "",
      lastName: "",
      username: "",
      password: ""
    })
  }
  addStudent = () => {
    this.setState({ addStudent: true })
  }
  updateField = (field, value) => {
    this.setState({[field]: value})
  }
  render() {
    const clickStudent = this.props.clickStudent;
    let students = this.props.students.map(student => {
      let level = student.moves.reduce((acc, move) => {
        if(move.completed && move.puzzle_id > acc.puzzle_id) {
          acc = move
        }
        return acc;
      }, 1)
      return (
        <StudentItem
          key={student.id}
          student={student.student}
          level={level.puzzle_id}
          attempts={student.moves.length}
        />
      )
    })
    let {firstName, lastName, username, password} = this.state
    return (
      <div className="student-history">
        <header className="header-box">
          <h2 className="header-text">Your Class</h2>
          {this.state.addStudent &&
            <AddStudent
              cancel={this.cancel}
              updateField={this.updateField}
              addStudent={this.createStudent}
              firstName={firstName}
              lastName={lastName}
              username={username}
              password={password} />}
        </header>
        <div className="student-table-container">
          <table className="student-table teacher-table">
            <thead className="header">
              <tr>
                <th width="10%"></th>
                <th width="25%">First</th>
                <th width="25%">Last</th>
                <th width="20%">Level</th>
                <th width="20%">Attempts</th>
              </tr>
            </thead>
            <tbody>
              {students}
            </tbody>
          </table>
          <div onClick={this.addStudent} className="add-student">
            <i className="fas fa-plus"></i>
          </div>
        </div>
      </div>
    );
  }
}

// Each row is a puzzle and the student's performance for that puzzle
function StudentItem({ student, level, attempts }) {
  let { id, first_name, last_name} = student;
  return (
    <tr>
      <td>{id}</td>
      <td><Link to={`/teacher/students/${id}`}>{first_name}</Link></td>
      <td>{last_name}</td>
      <td>{level}</td>
      <td>{attempts}</td>
    </tr>
  );
}

export default StudentHistory;

