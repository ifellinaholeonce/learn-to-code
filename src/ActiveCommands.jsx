import React, {Component} from 'react';

function ActiveCommands({input}) {
  let commands = input.map(command =>
    <button className="btn btn-primary command m-1">
      {command}
    </button>
  );
  return (
    <div className="active-commands">
      {commands}
    </div>
  );
}

export default ActiveCommands;