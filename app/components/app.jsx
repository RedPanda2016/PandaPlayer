import VideoPlayer from './videoPlayer/videoPlayer.jsx'
import SignIn from './sign-in/sign_in.jsx'
import SignUp from './sign-up/sign_up.jsx'
import chatRoom from './chat/chatRoom.jsx'
import Nav from './nav/nav.jsx'
import MessageList from './chat/messages.jsx'

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: null,
      loggedIn: false,
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      chatRoom: 'lobby',
      currentChatRoom: null,
      currentVideo: null,
      playing: false,
      seeking: false,
      player:0,
      messages: [],
      showSignIn: false,
      showSignUp: true,
      showVideoPlayer: false
    }

    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  messageSubmitHandler(message) {
    console.log('message fired off', message);
    socket.emit('messageSent',{message})
    }

  usernameSubmitHandler(name) {
    console.log('this is my name!', name)
    console.log(name);
    this.setState({ submitted: true, username: name}) ;
  }

  messageReceiveHandler(message) {
      console.log('messagereceiveHandler FIRED!', message);
      var {messages}= this.state;
      messages.push(message);
      this.setState({messages});
      console.log(this.state.messages);
  }

//for <form> this is login section

  componentDidMount() {

    var self = this;
    socket.emit('join');
    socket.on('loadUrl', function(data){
          console.log('url loaded on clientside');
          self.setState({ url : data });
      });

    socket.on('startVideo', function(){
      console.log('video started on clientside');
      self.setState({ playing: !self.state.playing });
    });

    socket.on('postMessage', function(data){
        console.log('this is the message received from server', data.message);
        self.messageReceiveHandler(data.message);
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
    console.log('playPause emitted from client-side!');
  }

  emitLoadUrl = (url) => {
    console.log('clientemit triggered');
    socket.emit('URL', {url});
        console.log(url);
  }

  logout = () => {
    this.setState({showSignUp: true});
    this.setState({showSignIn: false});
    this.setState({showVideoPlayer: false});
    console.log('Loggin out')
  }

  signIn = (e) => {
    e.preventDefault();

    var assemble = {
      userName: this.state.username,
      password: this.state.password
    };

    $.ajax({
      url: 'http://127.0.0.1:2727/api/auth',
      type: 'GET',
      contentType: 'application/json',
      data: assemble,
      success: function(data) {
        if (data) {
          this.setState({showSignUp: false});
          this.setState({showSignIn: false});
          this.setState({showVideoPlayer: true});
        }
        this.setState({username: '', firstname: '', lastname: '', email: '', password: ''});
      }.bind(this),
      error: function(err) {
        console.error(err.toString());
      }.bind(this)
    });
  }

  signUp = (e) => {

    var assemble = {
      userName: this.state.username,
      firstName: this.state.firstname,
      lastName: this.state.lastname,
      email: this.state.email,
      password: this.state.password
    };

    $.ajax({
      url: 'http://127.0.0.1:2727/api/auth',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(assemble),
      success: function(data) {
        this.setState({username: '', firstname: '', lastname: '', email: '', password: ''});
        this.setState({showSignUp: false});
        this.setState({showSignIn: true});
      }.bind(this),
      error: function(err) {
        console.error(err.toString());
      }.bind(this)
    });
    e.preventDefault();
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
    
  emitRoomName = (room) => {
    console.log('room name emit triggered');
    socket.emit('createRoom', {room});
    console.log('this is the room', room)
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
        <h2>Panda Player</h2>
        <button onClick={this.logout}>logout</button>
        <div id="mainWindow">
          {this.state.showSignUp ? <SignUp signUp={this.signUp} handleChange={this.handleChange} /> : null}
          {this.state.showSignIn ? <SignIn signIn={this.signIn} handleChange={this.handleChange} /> : null}
          {this.state.showVideoPlayer ? <VideoPlayer video={this.state.currentVideo}  emitPlayPause={this.emitPlayPause} loadUrl={this.loadUrl} emitLoadUrl={this.emitLoadUrl} playing={this.state.playing} currentVideo={this.state.url} /> : null}
        </div>
        <div>
        <h1>Chat Room</h1>
          <input ref={input => { this.username = input }} type='text' size='50' placeholder='who are you?' />
          <button onClick={() => this.usernameSubmitHandler(this.username.value)}>Here I Am!</button>

          <input ref={input => { this.message = input }} type='text' size='50' placeholder='what do you want to say?' />
          <button onClick={() => this.messageSubmitHandler(this.message.value)}>This is what I want to say!</button>

          <input ref={input => { this.roomName = input }} type='text' size='50' placeholder='create a chatroom' />
          <button onClick={() => this.emitRoomName(this.roomName.value)}>Submit Room Name</button>

          <MessageList messages={this.state.messages} username={this.state.username}/>
        </div>
      </div>
    )
  }
}
