import VideoPlayer from './videoPlayer/videoPlayer.jsx'
import SignIn from './sign-in/sign_in.jsx'
import SignUp from './sign-up/sign_up.jsx'


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      loggedIn: false,
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      playing: false,
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
    console.log('playPause emitted from client-side!');
  }

  playPause = () => {
    this.setState({ playing: !this.state.playing })
  }

  emitLoadUrl = (url) => {
    console.log('clientemit triggered');
    socket.emit('URL', {url});
        console.log(url);
  }
  // Handles log out by reverting back to signup page. Currently no session...
  logout = () => {
    this.setState({showSignUp: true});
    this.setState({showSignIn: false});
    this.setState({showVideoPlayer: false});
    this.setState({username: ''});
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
              password: ''});
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

  render () {
    return (
      <div>
        <h2>Panda Player</h2>
        <button onClick={this.logout}>logout</button>
        <button onClick={this.signInSignUpswap}>login/sign up</button>
          <div id="mainWindow">
            {this.state.showSignUp ? <SignUp signUp={this.signUp} handleChange={this.handleChange} /> : null}
            {this.state.showSignIn ? <SignIn signIn={this.signIn} handleChange={this.handleChange} /> : null}
            {this.state.showVideoPlayer ? <VideoPlayer video={this.state.currentVideo}  emitPlayPause={this.emitPlayPause} loadUrl={this.loadUrl} emitLoadUrl={this.emitLoadUrl} playing={this.state.playing} currentVideo={this.state.url} /> : null}
          </div>
      </div>
    )
  }
}