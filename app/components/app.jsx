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

  logout = () => {
    this.setState({showSignUp: true});
    this.setState({showSignIn: false});
    this.setState({showVideoPlayer: false});
    console.log('Loggin out')
  }

  swap = () => {
    if (this.state.showSignIn === false) {
      this.setState({showSignIn: true, showSignUp: false});
    } else {
      this.setState({showSignIn: false, showSignUp: true});
    }
  }

  signIn = (e) => {

    if (this.state.username !== '' && this.state.password !== '') {

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
            this.setState({username: '', firstname: '', lastname: '', email: '', password: ''});
          } else {
            alert('Invalid credentials');
          }
        }.bind(this),
        error: function(err) {
          console.error(err.toString());
        }.bind(this)
      });
    } else {
      alert('All fields are required');
    }
    e.preventDefault();
  }

  signUp = (e) => {

    if (this.state.username !== '' && this.state.firstname !== '' && this.state.lastname !== '' && this.state.email !== '' && this.state.password !== '') {

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
    } else {
      alert('All fields are required');
    }
    e.preventDefault();
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  render () {
    return (
      <div>
        <h2>Panda Player</h2>
        <button onClick={this.logout}>logout</button>
        <button onClick={this.swap}>login/sign up</button>
          <div id="mainWindow">
            {this.state.showSignUp ? <SignUp signUp={this.signUp} handleChange={this.handleChange} /> : null}
            {this.state.showSignIn ? <SignIn signIn={this.signIn} handleChange={this.handleChange} /> : null}
            {this.state.showVideoPlayer ? <VideoPlayer video={this.state.currentVideo}  emitPlayPause={this.emitPlayPause} loadUrl={this.loadUrl} emitLoadUrl={this.emitLoadUrl} playing={this.state.playing} currentVideo={this.state.url} /> : null}
          </div>
      </div>
    )
  }
}