import VideoPlayer from './videoPlayer/videoPlayer.jsx'
import chatRoom from './chat/chatRoom.jsx'
import Nav from './nav/nav.jsx'

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      chatRoom: 'lobby',
      currentChatRoom: null,
      currentVideo: null,
      url: '',
      playing: false
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

  componentDidMount() {

    var self = this;
    socket.emit('test');

    socket.on('loadUrl', function(data){
          console.log('url loaded on clientside')
          self.setState({ url : data });
      });

    socket.on('startVideo', function(){
      console.log('video started on clientside')
    })
  }


  emitPlayPause = () => {
      socket.emit('playPause');
      console.log('playPause emitted from client-side!')
  }
  playPause = () => {
    this.setState({ playing: !this.state.playing })
  }

  emitLoadUrl = (url) => {
    console.log('clientemit triggered');
    socket.emit('URL', {url});
        console.log(url);
  }
    
  render () {

    return (

        <div>
          <h1>Well this part works</h1>
          <Nav />
          <div id="mainWindow">
            <VideoPlayer video={this.state.currentVideo}  emitPlayPause={this.emitPlayPause} loadUrl={this.loadUrl} emitLoadUrl={this.emitLoadUrl} playing={this.state.playing} currentVideo={this.state.url} />
          </div>
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