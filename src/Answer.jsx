import React, {Component} from 'react';
import AnswerOptions from './AnswerOptions.jsx'

class Answer extends Component {
  render() {
    return (
      <div>
      <form>
        <label htmlFor="answer">Answer:</label>
        <input name="answer" type="text" />
        <input type="submit" value="Submit"/>
      </form>
      <AnswerOptions/>
      </div>
    );
  }
}

export default Answer;
