import React, {Component} from 'react';
import Dragula from 'react-dragula';
import DisplaySequence from './DisplaySequence.jsx';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const addItem = (commandList, actionList, startIndex, endIndex) => {
  const result = commandList.slice();
  const actions = actionList.slice()
  const removed = actions[startIndex];
  result.splice(endIndex, 0, Object.assign({}, removed));
  if(removed.loop) {
    let next = result.reduce((acc, command) => Math.max(acc, command.dropId || 0 ), 0) + 1
    actions.splice(3, 1);
    let newLoop = {loop: {num: 2, cmds: []}, dropId: next}
    actions.splice(3, 0, newLoop)
  }

  return {pending: result, commands: actions};
}

const addItemToLoop = (commandList, actionList, startIndex, endIndex) => {
  const result = commandList.slice();
  let loop = result.find((move) => move.loop)
  const removed = actionList[startIndex];
  loop.loop.cmds.push(removed)

  return result;
}

const reorder = (commandList, startIndex, endIndex) => {
  const result = commandList.slice();
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const deleteItem = (commandList, startIndex) => {
  let result = commandList.slice();
  result.splice(startIndex, 1);

  return result;
}

class Answer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      commands: [
        {movement: {dir: 'forward'}},
        {movement: {dir: 'left'}},
        {movement: {dir: 'right'}},
        {loop: {num: 2, cmds: []}, dropId: 1},
        {pickup: {item: ''}}],
      items: ['berry', 'wood'],
      input: [],
      numLoops: 1
    };
  }

  componentDidMount () {

  }

  onDragEnd = (result) => {

    console.log("Source:", result.source, "Destination:", result.destination)
    let pendingCommands = this.props.pendingCommands;
    if (!result.destination || (result.destination.droppableId !== "commands" && !result.destination.droppableId.includes("loop"))) {
      console.log("delete")
      console.log(result.destination)
      if(result.source.droppableId === "commands" || result.source.droppableId.includes("loop")) {
        pendingCommands = deleteItem(this.props.pendingCommands, result.source.index)
      }
    } else if (result.destination.droppableId === "commands" && result.source.droppableId === "commands") {
      console.log("reorder")
      pendingCommands = reorder(
        this.props.pendingCommands,
        result.source.index,
        result.destination.index)
    } else if ((result.source.droppableId.includes("action") || result.source.droppableId.includes("loop")) && result.destination.droppableId === "commands") {
      console.log("add")
      pendingCommands = addItem(
        this.props.pendingCommands,
        this.state.commands,
        result.source.index,
        result.destination.index )
      this.props.prepCommands(pendingCommands.pending)
      console.log("commands before set:", pendingCommands.commands)
      this.setState({commands: pendingCommands.commands})
      return
    } else if (result.destination.droppableId.includes("loop")) {
      console.log("addloop")
      pendingCommands = addItemToLoop(
        this.props.pendingCommands,
        this.state.commands,
        result.source.index,
        result.destination.index )
    }
    this.props.prepCommands(pendingCommands)
  }

  render() {
    return (
      <div className="commands-display">
        <button onClick={this.props.runCommands} className="play-btn">
          PLAY
        </button>
        <DragDropContext
          onDragStart={this.onDragStart}
          onDragEnd={this.onDragEnd} >
          <div className="commands-row">
            <div className="available-actions">
              <Droppable droppableId="actions" type="action">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    // style={{ backgroundColor: snapshot.isDraggingOver ? 'grey' : 'lightgrey' }}
                    >
                    {console.log("Pending:", this.props.pendingCommands)}
                    {this.state.commands.map((move, i) =>
                        <DisplaySequence type="action" key={i} i={i} move={move} />
                      )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
            <div className="commands-list">
              <Droppable droppableId="commands" type="action">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    // style={{ backgroundColor: snapshot.isDraggingOver ? 'grey' : 'lightgrey' }}
                    >
                    {this.props.pendingCommands &&
                      this.props.pendingCommands.map((move, i) =>
                        <DisplaySequence type="command" key={i} i={i} move={move} />)}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </DragDropContext>
      </div>
    );
  }
}

function Command({ type, content }) {
  return (
    <div className={`${content} ${type} action`}>
      {content}
    </div>
  )
}

export default Answer;
