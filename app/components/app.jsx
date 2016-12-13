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

  logout = () => {
    this.setState({showSignUp: true});
    this.setState({showSignIn: false});
    this.setState({showVideoPlayer: false});
    console.log('Loggin out')
  }

  signIn = (e) => {
    e.preventDefault();

    this.setState({showSignUp: false});
    this.setState({showSignIn: false});
    this.setState({showVideoPlayer: true});

    helpers.get();

    // do after GET request
    this.setState({username: '', firstname: '', lastname: '', email: '', password: ''});
  }

  signUp = (e) => {
    e.preventDefault();

    this.setState({showSignUp: false});
    this.setState({showSignIn: true});

    var assemble = {
      userName: this.state.username,
      firstName: this.state.firstname,
      lastName: this.state.lastname,
      email: this.state.email,
      password: this.state.password
    };

    helpers.post(assemble);
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
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
      </div>
    )
  }
}