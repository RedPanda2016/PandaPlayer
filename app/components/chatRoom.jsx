export default class chatRoom extends React.Component {

  constructor(){
    super();
    //create new chatroom state
    this.state = {
      currentRoom: "general",
      messages: []
    };
  }


  render () {
    return (
      <div>
        <div className="roomslist"></div>
        <button id="createRoom"></button>
        <div id={this.state.currentRoom}>
          {this.state.messages}
        </div>
      </div>
    );
  }
}