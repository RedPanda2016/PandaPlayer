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
    // Binds this to these functions to handle the form data...
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
  // Handles log out by reverting back to signup page. Currently no session...
  logout = () => {
    this.setState({showSignUp: true,
                  showSignIn: false,
                  showVideoPlayer: false,
                  username: '',
                  loggedIn: false});
    socket.emit('disconnect')
  }
  // switches between login and sign up forms before user is logged in...
  signInSignUpswap = () => {
    if (this.state.showSignIn === false) {
      this.setState({showSignIn: true, showSignUp: false});
    } else {
      this.setState({showSignIn: false, showSignUp: true});
    }
  }
  // handles sign in when submit is clicked in sign in...
  signIn = (e) => {
    // if username and password are not null...
    if (this.state.username !== '' && this.state.password !== '') {
      // assembles username and password into and object for GET request...
      var assemble = {
        userName: this.state.username,
        password: this.state.password
      };
      // GET request to /api/auth for validation...
      $.ajax({
        url: 'http://127.0.0.1:2727/api/auth',
        type: 'GET',
        contentType: 'application/json',
        data: assemble,
        success: function(data) {
          // auth returns a boolean, if the value is true then we alter the state of the app to show the video player...
          if (data) {
            this.setState({
              showSignIn: false,
              showVideoPlayer: true,
              showSignUp: false,
              firstname: '',
              lastname: '',
              email: '',
              password: '',
              loggedIn: true
            });
          } else {
            // else alert, note --> user cannot login without valid credentials however this alert will not fire. I also checked that the data is a boolean and it in fact is.
            alert('Invalid credentials');
          }
        }.bind(this),
        error: function(err) {
          console.error(err.toString());
        }.bind(this)
      });
    } else {
      // Alerts user to fill in all fields...
      alert('All fields are required');
    }
    e.preventDefault();
  }
  // handles sign in when submit is clicked in sign up...
  signUp = (e) => {
    // if username, firstname, lastname, email and password are not null...
    if (this.state.username !== '' && this.state.firstname !== '' && this.state.lastname !== '' && this.state.email !== '' && this.state.password !== '') {
      // Assembles sign up data into and object...
      var assemble = {
        userName: this.state.username,
        firstName: this.state.firstname,
        lastName: this.state.lastname,
        email: this.state.email,
        password: this.state.password
      };
      // Post request to /api/auth to add user, currently there are no resrcitions on what data can be sent to the server...
      $.ajax({
        url: 'http://127.0.0.1:2727/api/auth',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(assemble),
        success: function(data) {
          // upon successfully adding user info to db reset all fields to '' and move user to sign in form...
          this.setState({
            showSignUp: false,
            showSignIn: true,
            username: '',
            firstname: '',
            lastname: '',
            email: '',
            password: ''});
        }.bind(this),
        error: function(err) {
          console.error(err.toString());
        }.bind(this)
      });
    } else {
      //  alerts user that all fields are required...
      alert('All fields are required');
    }
    e.preventDefault();
  }
  // Function adds input field data to state
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
        <h2 className="text-center">Panda Player</h2>
        {this.state.loggedIn ? <input className="logout" type="button" value="logout" onClick={this.logout}/> : null}
        <button onClick={this.signInSignUpswap}>login/sign up</button>
        <div id="mainWindow">
          {this.state.showSignUp ? <SignUp signUp={this.signUp} handleChange={this.handleChange} /> : null}
          {this.state.showSignIn ? <SignIn signIn={this.signIn} handleChange={this.handleChange} /> : null}
          {this.state.showVideoPlayer ? <VideoPlayer video={this.state.currentVideo}  emitPlayPause={this.emitPlayPause} loadUrl={this.loadUrl} emitLoadUrl={this.emitLoadUrl} playing={this.state.playing} currentVideo={this.state.url} /> : null}
        </div>
        {this.state.loggedIn ? <div>
          <h1>Chat Room</h1>
          <input ref={input => { this.message = input }} type='text' size='50' placeholder='what do you want to say?' />
          <button onClick={() => this.messageSubmitHandler(this.message.value, this.state.username)}>This is what I want to say!</button>
          <MessageList messages={this.state.messages} />
        </div> : null }
      </div>
    )
  }
}
