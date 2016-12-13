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
      url: null,
      playing: false,
      seeking: false,
      player:
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
          console.log('url loaded on clientside');
          self.setState({ url : data });
      });

    socket.on('startVideo', function(){
      console.log('video started on clientside');
      self.setState({ playing: !self.state.playing });
    })



    var self = this;
    socket.emit('test');
    socket.on('mounted', function(){
      socket.emit('')
    })
    socket.on('loadUrl', function(data){
          console.log('url loaded on clientside');
          self.setState({ url : data });
      });


    socket.on('startVideo', function(){
      console.log('video started on clientside');
      self.setState({ playing: !self.state.playing });
    });

    socket.on('stop', function(){
      console.log('video stopped on clientside');
      self.setState({ url: null, playing: false })
    });

    socket.on('onSeekMouseDown', function(){
      console.log('onSeekMouseDown on clientside');
      self.setState({ seeking: true });
    });
    socket.on('onSeekChange', function(){
      console.log('onSeekChange on clientside');
      self.setState({ played: parseFloat(e.target.value) });
    });
    socket.on('onSeekMouseUp', function(){
      console.log('onSeekMouseUp on clientside');
      self.setState({ seeking: false })
      self.player.seekTo(parseFloat(e.target.value));
    });
  }

  emitPlayPause = () => {
      socket.emit('playPause');
      console.log('playPause emitted from client-side!')
  }

  emitLoadUrl = (url) => {
    console.log('clientemit triggered');
    socket.emit('URL', {url});
        console.log(url);
  }

  emitStop = () => {
    socket.emit('stop')
    console.log('stop emitted from client-side!');
  }

  onSeekMouseDown = e => {
    this.setState({ seeking: true })
  }
  onSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) })
  }
  onSeekMouseUp = e => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }
  emitSeekMouseDown = () => {
    socket.emit('seekMouseDown');
    console.log('seekMouseDown from client-side!');
  }
  emitSeekChange = e => {
    socket.emit('seekChange');
    console.log('seekChange emitted from client-side!');
  }
  emitSeekMouseUp = e => {
    socket.emit('seekMouseUp');
    console.log('seekMouseUp emitted from client-side!');
  }

  render () {
    return (
        <div>
          <h1>Well this part works</h1>
          <Nav />
          <div id="mainWindow">
            <VideoPlayer video={this.state.currentVideo}  emitPlayPause={this.emitPlayPause} loadUrl={this.loadUrl} emitLoadUrl={this.emitLoadUrl} playing={this.state.playing} currentVideo={this.state.url} emitStop={this.emitStop} player={this.state.player} />
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