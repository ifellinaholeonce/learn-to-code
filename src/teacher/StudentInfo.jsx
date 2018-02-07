import React, {Component} from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Puzzle from '../puzzle/Puzzle.jsx';
import TeacherPuzzles from './TeacherPuzzles.jsx';
import request from '../../models/resource.js'

// Component for displaying each individual students performance
class StudentInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moves: [],
      puzzles: [],
      puzzleId: null
    };
  }
  componentDidMount() {
    request(`students/${this.props.match.params.id}/moves`, "GET", this.props.auth)
      .then((data) => {
        let { moves, puzzles } = data
        this.setState({ moves, puzzles });
      });
  }
  render() {
    let puzzleId = this.props.location.pathname.match(/(\d+)/g)[1]
    let puzzle = this.state.puzzles.find((puz) => puz.id == puzzleId)
    return (
      <div className="student-info">
      <Switch>
        <Route
          path="/teacher/students/:id" exact
          render={(props) => <TeacherPuzzles {...props}
            puzzles={this.state.puzzles}
            moves={this.state.moves}
            studentId={this.props.match.params.id} />} />
        <Route path="/teacher/students/:studentId/puzzle/:puzzleId"
          render={(props) => <Puzzle {...props}
          user="Teacher"
          puzzle={puzzle}
          moves={this.state.moves} />} />
        </Switch>
      </div>
    );
  }
}

export default StudentInfo;