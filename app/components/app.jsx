import VideoPlayer from './videoPlayer/videoPlayer.jsx'
import chatRoom from './chat/chatRoom.jsx'

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      chatRoom: 'lobby',
      currentChatRoom: null,
      currentVideo: null
    }
     // Bind 'this' to event handlers.
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.usernameSubmitHandler = this.usernameSubmitHandler.bind(this);
  }
  usernameChangeHandler(event) {
    this.setState({ username: event.target.value });
  }
  usernameSubmitHandler(event) {
    event.preventDefault();
    this.setState({ submitted: true, username: this.state.username });
  }
//for <form> this is login section
  render () {

    return (

        <div>
          <h1>Well this part works</h1>
          <VideoPlayer video={this.state.currentVideo} />
            <div>
            <h1>Chat Rooms</h1>
              <form onSubmit={this.usernameSubmitHandler} className="username-container">
                <chatRoom  />
                <input type="text" placeholder="create a chatroom" />
                <input type="submit" value="submit" />
                <input type="text" placeholder="chatrooms" />
                <input
                  type="text"
                  onChange={this.usernameChangeHandler}
                  placeholder="Enter your name"
                  required />
                  <input type="submit" value="submit" />
              </form>
            </div>
        </div>

    )
  }
}