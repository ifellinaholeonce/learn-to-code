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

  getHighestLevel(student) {
    let level = student.moves.reduce((acc, move) => Math.max(acc, move.completed ? move.puzzle_id + 1 : move.puzzle_id), 0)
    return level
  }

  getPercent(level) {
    let percent = this.props.students.reduce((acc, student) => {
      let highLevel = this.getHighestLevel(student)
       if (highLevel === level) {
         acc++
       }
       return acc }, 0)
    return Number.parseFloat((percent/this.props.students.length)*100).toFixed(0)
  }

  render() {
    const clickStudent = this.props.clickStudent;
    let students = this.props.students.map((student, i) => {
      let level = this.getHighestLevel(student)
      return (
        <StudentItem
          key={i}
          index={i}
          student={student.student}
          level={level}
          attempts={student.moves.length}
        />
      )
    })
    let {firstName, lastName, username, password} = this.state
    return (
      <div className="student-history">
        <header className="header-box">
          <h2 className="header-text">Class Stats</h2>
        </header>
        <table className="student-table header-included teacher-table">
          <section className="graph-wrapper">
            <div className="graph">
            <dl>
              <dt className="header">
                Highest Level Unlocked (%)
              </dt>
              <dd className={"percentage percentage-" + this.getPercent(1)}><span className="text">Level 1: ({this.getPercent(1)}%)</span></dd>
              <dd className={"percentage percentage-" + this.getPercent(2)}><span className="text">Level 2: ({this.getPercent(2)}%)</span></dd>
              <dd className={"percentage percentage-" + this.getPercent(3)}><span className="text">Level 3: ({this.getPercent(3)}%)</span></dd>
              <dd className={"percentage percentage-" + this.getPercent(4)}><span className="text">Level 4: ({this.getPercent(4)}%)</span></dd>
              <dd className={"percentage percentage-" + this.getPercent(5)}><span className="text">Level 5: ({this.getPercent(5)}%)</span></dd>
            </dl>
            </div>
          </section>
        </table>
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
        <div className="student-table-container bottom-table">
          <table className="student-table header-included teacher-table">
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
function StudentItem({ index, student, level, attempts }) {
  let { id, first_name, last_name} = student;
  return (
    <tr>
      <td>{index + 1}</td>
      <td><Link to={`/teacher/students/${id}`}>{first_name}</Link></td>
      <td>{last_name}</td>
      <td>{level}</td>
      <td>{attempts}</td>
    </tr>
  );
}

export default StudentHistory;
