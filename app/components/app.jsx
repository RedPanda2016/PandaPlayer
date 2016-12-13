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
      roomname: 'default',
      currentVideo: null,
      playing: false,
      messages: [],
      showSignIn: false,
      showSignUp: true,
      showVideoPlayer: false

    }

    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }


  componentDidMount() {

    var self = this;
    socket.emit('join', self.state.roomname);
    socket.on('loadUrl', function(data){
          console.log('url loaded on clientside');
          self.setState({ url : data });
      });

    socket.on('startVideo', function(){
      console.log('video started on clientside');
      self.setState({ playing: !self.state.playing });
    });

    socket.on('postMessage', function(data){
        console.log('this is the data', data)
        console.log('this is the message received from server', data.message);
        self.messageReceiveHandler(data.message, data.username);
    });
    
    socket.on('stop', function(){
      console.log('video stopped on clientside');
      self.setState({ url: null, playing: false })
    });

  }

  messageSubmitHandler(message, username) {
    console.log('message fired off', message, username);
     socket.emit('messageSent',{message, username})
  }


  messageReceiveHandler(message, username) {
    console.log('messagereceiveHandler FIRED!', message, username);
      var {messages}= this.state;
      messages.push([message, username]);
      this.setState({messages});
      console.log('this is the state of the messages', this.state.messages);
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
    console.log('Loggin out');
    socket.emit('disconnect')

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
            console.log(data);
          this.setState({showSignUp: false});
          this.setState({showSignIn: false});
          this.setState({showVideoPlayer: true});
        }
        this.setState({firstname: '', lastname: '', email: '', password: ''});
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
          console.log(data);
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
  }
    
  emitRoomName = (room) => {
    console.log('room name emit triggered');
    socket.emit('createRoom', {room});
    console.log('this is the room', room)
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

          <input ref={input => { this.message = input }} type='text' size='50' placeholder='what do you want to say?' />
          <button onClick={() => this.messageSubmitHandler(this.message.value, this.state.username)}>This is what I want to say!</button>

          <MessageList messages={this.state.messages} />
        </div>
      </div>
    )
  }
}
