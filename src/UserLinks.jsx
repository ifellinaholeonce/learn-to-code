import React, {Component} from 'react';

class UserLinks extends Component {
  render() {
    const onClick = action => e => {
      this.props.toggleForm(action);
    };
    return(
      <div className="">
        <UserButton onClick={onClick("login")} type="Login"/>
        <UserButton onClick={onClick("register")} type="Register"/>
      </div>
    );
  }
}

function UserButton({onClick, type}) {
  return (
    <button onClick={onClick} className="btn btn-primary">{type}</button>
  );
}

export default UserLinks;