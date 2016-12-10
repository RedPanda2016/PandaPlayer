export default class chatRoom extends React.Component {
  constructor(props){
    super(props);
    //create new chatroom state
    this.state = {
      currentRoom: "general",
      messages: []
    };
  }

  render () {
    return (
      <div>
        <div className="roomList">

        </div>
        <div className="createRoom">

        </div>
        <div className="messages">

        </div>
        <div className="chatInput">

        </div>
      </div>
    );
  }
}