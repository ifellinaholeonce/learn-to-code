import React, {Component} from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
        
import Navbar from './Navbar.jsx';
import Puzzle from './Puzzle.jsx';
import LoginForm from './Login.jsx';
import RegisterForm from './Register.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "placeholder"
    };
  }
  componentDidMount() {
    // Fetch calls for Puzzle
  }

  render() {
    console.log("Rendering <App/>");
    return (
      <div className="content">
        <Navbar/>
        <Switch>
          <Route path="/" exact component={Puzzle} />
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
        </Switch>
      </div>
    );
  }
}

export default App;
