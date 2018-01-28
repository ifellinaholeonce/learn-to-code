import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class TeacherView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [
      {
        id: 1,
        firstName: "Mandy",
        lastName: "Cheang",
        levelReached: 5,
        attempts: 5
      },
      {
        id: 2,
        firstName: "Tymm",
        lastName: "Schulich",
        levelReached: 4,
        attempts: 6
      },
      {
        id: 3,
        firstName: "Andrew",
        lastName: "Carroll",
        levelReached: 3,
        attempts: 8
      }
    ]};
  }
  render() {
    return (
      <div className="teacher-view">
        <StudentHistory students={this.state.students} />
      </div>
    );
  }
}

function StudentItem({id, firstName, lastName, levelReached, attempts}) {
  return (
    <tr>
      <td>{id}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{levelReached}</td>
      <td>{attempts}</td>
    </tr>
  );
}

export default TeacherView;