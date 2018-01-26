import React, {Component} from 'react';
import Answer_Options from './Answer_Options.jsx'

class Answer extends Component {
  render() {
    return (
      <div>
      <form>
        <label htmlFor="answer">Answer:</label>
        <input name="answer" type="text" />
        <input type="submit" value="Submit"/>
      </form>
      <Answer_Options/>
      </div>
    );
  }
}

export default Answer;
