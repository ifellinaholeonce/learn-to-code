import React, {Component} from 'react';
import { Route, Switch, Link } from 'react-router-dom';

// Returns a table with an overview of each students performance
class AddStudent extends Component {
  render() {
    let { firstName, lastName, username, password } = this.props
    const onChange = field => e => {
      this.props.updateField(field, e.target.value)
    }
    return (
      <div className="add-student-form">
        <form className="create-student" onSubmit={this.props.addStudent}>
          <div className="form-row">
            <input
              onChange={onChange("firstName")}
              className="form-input"
              type="text"
              name="firstName"
              value={firstName}
              placeholder="First name"/>
            <input
              onChange={onChange("lastName")}
              className="form-input"
              type="text"
              name="lastName"
              value={lastName}
              placeholder="Last name"/>
          </div>
          <div className="form-row">
            <input
              onChange={onChange("username")}
              className="form-input"
              type="text"
              name="username"
              value={username}
              placeholder="Username"/>
          </div>
          <div className="form-row">
            <input
              onChange={onChange("password")}
              className="form-input"
              type="password"
              name="password"
              value={password}
              placeholder="Initial password"/>
          </div>
          <button className="button" type="submit" name="submit">Add Student</button>
          <button onClick={this.props.cancel} className="button">Cancel</button>
        </form>
      </div>
    )
  }
}

export default AddStudent